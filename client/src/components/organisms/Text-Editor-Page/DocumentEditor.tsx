import { ContentBlock, ContentState, convertFromRaw,  convertToRaw, DraftBlockType, Editor, EditorProps, EditorState, RawDraftContentState, SelectionState} from "draft-js";
import { useContext, useEffect, useRef } from "react";
import { EditorContext } from "../../../context/editor-context";
import "draft-js/dist/Draft.css";
import "../../CSS/DocumentEditor.css";
import { SocketEvent } from "../../../types/enums/SocketEvents";
import { SocketContext } from "../../../context/socket-context";
import { useDispatch, useSelector } from "react-redux";
import { DocumentStateType, UserStateType } from "../../../vite-env";
import { useParams } from "react-router";
import customStyleMap from "../../values/customStyleMap";
import "../../values/blockStyleFnClasses.css";

const DocumentEditor = () =>{

    const { editorState, setEditorState, editorRef, handleEditorChange} = useContext(EditorContext);
    //current users existance in the socket-----------------
    const  { user} = useSelector(( state:{ user:UserStateType})=>state.user);
    const { document} = useSelector(( state:{ document:DocumentStateType})=>state.document)
    const params = useParams();
    const socket = useContext( SocketContext).socket;
    


    //-----------------insert image block renderer---------

    const MediaComponent = ( props:{ block:ContentBlock, contentState: ContentState, selection: SelectionState}) =>{

        const entity = props.contentState.getEntity(props.block.getEntityAt(0));

        const { src} = entity.getData();
        const type = entity.getType();

        return <img src={src} alt={type}/>

      
    }
    
    const mediaBlockRenderer = ( block:ContentBlock)=>{

        if(block.getType() === 'atomic'){
            return { component: MediaComponent, editable: true}
        }

        return null;

        
    };

    //-----------------------------------------------------

    



    //this is used when , document load directly to the editor with document id
    useEffect(()=>{

        socket?.emit( SocketEvent.CURRENT_USERS, { user, documentId: params.id});

        return ()=>{
            socket?.emit( SocketEvent.USER_DISCONNECT_FROM_CURRENT_USERS, { user, documentId: params.id});
        }

    },[document]);

    //when user go from create page to editor page and editor to create page
    useEffect(()=>{

        socket?.emit( SocketEvent.CURRENT_USERS, { user, documentId: params.id});

        return ()=>{
            socket?.emit( SocketEvent.USER_DISCONNECT_FROM_CURRENT_USERS, { user, documentId: params.id});
        }

    },[]);


    //---------------------------------------add classes for 


        
     
    //--------------load text at start, and also when text changed with sockets---------------------------------------

    useEffect(()=>{

        if(document?.content){
            const newEditorState = EditorState.createWithContent( convertFromRaw(document?.content as RawDraftContentState) );
            const moveCursorToEnd = EditorState.moveFocusToEnd(newEditorState);
            
            setEditorState(moveCursorToEnd);
        }
        
        


    },[document?.content]);


    return(
        <>
        <div className="border-2 w-full">
            <div className="mt-6 sm:w-[90%] md:w-[700px] mx-auto shadow-xl shadow-blue-200">
               
                <Editor 
                    editorState={ editorState} 
                    onChange={( editorState)=>{ setEditorState(editorState); handleEditorChange(editorState); }} 
                    ref={editorRef} 
                    placeholder="start writing... "
                    customStyleMap={ customStyleMap} //set text color and highlight color
                    // blockStyleFn={}          //set( if we want custom styling classes)
                    blockRendererFn={ mediaBlockRenderer}   //set image
                />
            </div>
        </div>
        </>
    )

}

export { DocumentEditor};


























