import { convertFromHTML, convertFromRaw, convertToRaw, Editor, EditorState, RawDraftContentState, } from "draft-js";
import { createContext, MutableRefObject, useRef, useState, SetStateAction, Dispatch, useContext, useEffect} from "react";
import axios from "axios";
import { savingDocument, setCurrentUsers, setDocument } from "../redux/Slices/documentSlice";
import { server } from "../utils/config";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { DocumentStateType, UserStateType } from "../vite-env";
import useLocalStorage from "../hooks/useLocalStorage";
import { SocketContext } from "./socket-context";
import { SocketEvent } from "../types/enums/SocketEvents";
import { ToastContext } from "./toast-context";
import { title } from "process";

interface EditorContextInterface{
    editorState: EditorState,
    setEditorState: Dispatch<SetStateAction<EditorState>>,
    editorRef: null | MutableRefObject<null | Editor>
    handleEditorChange: ( editorState: EditorState)=>void
}

const defaultValue:EditorContextInterface = {
    editorState: EditorState.createEmpty(),
    setEditorState: ()=>{},
    editorRef: null,
    handleEditorChange: ()=>{}
}


export const EditorContext = createContext<EditorContextInterface>(defaultValue);

export const EditorProvider = ({ children}:{ children: JSX.Element})=>{


    //editor state
    const [ editorState, setEditorState] = useState(defaultValue.editorState);
    const editorRef = useRef<Editor|null>(null);

    //document from redux
    const { document} = useSelector((state:{ document: DocumentStateType})=>state.document);
    const dispatch = useDispatch();
    //this access token is not taken useLocalStorage, cause when typing changed then the function calls, but it will not rerender the page , so if accesstoken is change , then the older token is used , it will not go again for token from localStorage
    const { accessToken} = useSelector((state:{ user:UserStateType})=>state.user);
    let saveDocumentInterval = useRef<NodeJS.Timeout | null>(null);

    //toast
    const { error} = useContext(ToastContext);

    //socket
    const socket = useContext(SocketContext).socket;


    
    //send changes in docs
    const handleEditorChange = (editorState: EditorState):void=>{


        if(document==null || socket===null){
            return;
        }
        
        //convert editor state to raw data
        const content = convertToRaw(editorState.getCurrentContent());
        

            //if user type before 2 seconds than clear interval, and start again
            if(saveDocumentInterval.current){
                clearInterval(saveDocumentInterval.current);
            }


            //now update in database after 2 seconds
            saveDocumentInterval.current = setTimeout( async ()=>{
      
                //send content through socket, after 2 seconds
                socket?.emit( SocketEvent.SEND_DOCUMENT_CHANGES, { content});
                
                dispatch(savingDocument(true));
        
                try{
                    await axios.put(`${server}/document/${document?.id}`, { content}, { headers:{ "Content-Type":"application/json", "Authorization":`Bearer ${accessToken}` } });
                     //when document content change editor state is automatically changed
                }
                catch(err:any ){
                    error("error in saving the document, Please try again.");
                }
                finally{
                    dispatch(savingDocument(false));
                }

            },2000);

    
    }


    //receive changes in docs
    useEffect(()=>{


        const handleReceiveChange = ( data:{ content: RawDraftContentState} ):void=>{

            const title = document?.title;

             //when document content change editor state is automatically changed
            dispatch( setDocument({ ...document, title: title, content: data?.content }));
            

        }
        

        socket?.on(SocketEvent.RECEIVE_DOCUMENT_CHANGES, handleReceiveChange);
        
        return ()=>{
            socket?.off(SocketEvent.RECEIVE_DOCUMENT_CHANGES, handleReceiveChange);
        }

    },[socket]);

    

    


    //update current users

    const handleUpdateCurrentUsers = ( data:{ currentUsers: Array<string>})=>{

        dispatch( setCurrentUsers(data.currentUsers));

    }

    useEffect(()=>{

        socket?.on(SocketEvent.CURRENT_USERS, handleUpdateCurrentUsers );

        return ()=>{
            socket?.off(SocketEvent.CURRENT_USERS, handleUpdateCurrentUsers);
        }

    },[ socket]);
   

    //disconnect socket
    useEffect(()=>{
        return ()=>{
            socket?.disconnect();
        }
    },[]);


    return (
    <EditorContext.Provider value={{ editorState, setEditorState, editorRef, handleEditorChange }}>
        {children}
    </EditorContext.Provider>)


}











