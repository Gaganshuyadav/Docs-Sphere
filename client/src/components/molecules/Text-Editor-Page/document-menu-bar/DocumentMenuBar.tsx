import Logo from "../../../atoms/logo/Logo";
import { server } from "../../../../utils/config";
import axios from "axios";
import { ChangeEvent, useContext, useEffect, useRef, useState, memo, useCallback } from "react";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import { useNavigate, useParams } from "react-router";
import { savingDocument, setDocument} from "../../../../redux/Slices/documentSlice";
import { ToastContext } from "../../../../context/toast-context";
import { ShareDocumentModel } from "../share-document-model/ShareDocumentModel";
import UserDropdown from "../../../atoms/user-dropdown/UserLogoutDropdown";
import { useDispatch, useSelector } from "react-redux";
import { DocumentStateType, UserStateType } from "../../../../vite-env";
import { AppDispatch } from "../../../../redux/store";
import { File } from "../../../atoms/Text-Editor-Page/menu-specific-editor-operations/File";
import { Edit } from "../../../atoms/Text-Editor-Page/menu-specific-editor-operations/Edit";
import { View } from "../../../atoms/Text-Editor-Page/menu-specific-editor-operations/View";
import { Insert } from "../../../atoms/Text-Editor-Page/menu-specific-editor-operations/Insert";
import Format from "../../../atoms/Text-Editor-Page/menu-specific-editor-operations/Format";
import { Tools } from "../../../atoms/Text-Editor-Page/menu-specific-editor-operations/Tools";
import { AddOns } from "../../../atoms/Text-Editor-Page/menu-specific-editor-operations/Add-ons";
import { Help } from "../../../atoms/Text-Editor-Page/menu-specific-editor-operations/Help";
import { ComponentStateType, setActiveDialogForMenuUseBoolean, setActiveDialogForMenuUseIdx } from "../../../../redux/Slices/componentSlice";
import { EditorContext } from "../../../../context/editor-context";
import { EditorState, SelectionState } from "draft-js";
import { SocketContext } from "../../../../context/socket-context";
import { SocketEvent } from "../../../../types/enums/SocketEvents";
import { Menu} from "@mui/icons-material";
import { useRandomColor } from "../../../../hooks/useRandomColor";

export default function DocumentMenuBar(){

    const { document} = useSelector( (state:{ document: DocumentStateType})=>state.document);
    const { user} = useSelector( ( state:{ user: UserStateType})=>state.user);

    const [ accessToken ] = useLocalStorage("docs-sphere-refresh-token", "");
    const MenuBarForEditorRef = useRef<HTMLDivElement>(null);
    const params = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [ updatedTitle, setUpdatedTitle] = useState<string>("");
    const { error} = useContext(ToastContext);
    const socket = useContext(SocketContext).socket;

    //--------responsiveness----------------------
    const [ openCloseButtonForMenuBarResponsiveness, setOpenCloseButtonForMenuBarResponsiveness] = useState(false);
    const MenuBarForEditorMiniRef = useRef<HTMLDivElement>(null);
    //--------------------------------------------
    

    if(params.id===undefined){
        navigate("/document/all/create");
    }

    
    // upate title api
    const updateDocumentTitleOnBlurInput = async ()=>{

        if(document?.userId!==user?.id){
            error("Only admin can edit this document");
            setUpdatedTitle(document?.title as string);
            return;
        }

        dispatch(savingDocument(true));

        try{
            await axios.put(`${server}/document/${params.id}`, { title: updatedTitle}, { headers:{ "Content-Type":"application/json", "Authorization":`Bearer ${accessToken}` } });
            dispatch( setDocument({ ...document, title: updatedTitle }));
        }
        catch(err:any ){
            if(err.response.data.errors[0].type === "field"){
                error(err.response.data.errors[0].msg);
            }
            else{
                error("error in saving the document, Please try again.");
            }
            
        }
        finally{
            dispatch(savingDocument(false));
        }
    
    }

    //update title in start
    useEffect(()=>{
        setUpdatedTitle(document?.title || "");
    },[document]);

    
    //socket event for update title
    const handleUpdatedTitleEvent = ( data:{ title: string})=>{
        dispatch( setDocument({...document, title: data.title}));
    };

    useEffect(()=>{

        socket?.on(SocketEvent.UPDATE_TITLE, handleUpdatedTitleEvent);

        return ()=>{

            socket?.off(SocketEvent.UPDATE_TITLE, handleUpdatedTitleEvent);
        }

    },[ socket]);


    //menu dialog for medium screen
    useEffect(()=>{

        const MenuButtonsAllClose = (e:MouseEvent)=>{

            if(!MenuBarForEditorRef.current?.contains( e.target as HTMLDivElement)){
                dispatch( setActiveDialogForMenuUseBoolean(false));
                setOpenCloseButtonForMenuBarResponsiveness(false);

                
            }

        };

        window.addEventListener("click", MenuButtonsAllClose);

        return ()=>{
            window.removeEventListener("click",MenuButtonsAllClose);
        }

    },[]);


    return (
    <div className=" flex flex-row justify-between items-center h-24 bg-white z-30">

        <div className="flex">
            <div className="ml-4 flex items-center justify-center">
                <Logo marginLeft={0} width={40}/>
            </div>
            <div >
                <div className=" w-full">
                    <input 
                        type="text" 
                        className="outline-none text-lg p-2 pl-3 w-full text-gray-900 font-semibold tracking-wide border-b-2 border-gray-200" 
                        placeholder="FileName"
                        spellCheck={false}
                        value={updatedTitle}
                        onChange={(e : ChangeEvent<HTMLInputElement>)=>{ setUpdatedTitle(e.target.value )}}
                        onBlur={updateDocumentTitleOnBlurInput}

                    />
                </div>
                
                <div ref={MenuBarForEditorRef} >
                    {/* menu */}
                    
                    <div className="md:flex md:flex-row hidden relative">
                        <MenuButton key={0} keyValue={0} name={"File"} component={ <File idx={0}/>} /> 
                        <MenuButton key={1} keyValue={1} name={"Edit"} component={ <Edit idx={1}/>} /> 
                        <MenuButton key={2} keyValue={2} name={"View"} component={ <View idx={2}/>} /> 
                        <MenuButton key={3} keyValue={3} name={"Insert"} component={ <Insert idx={3}/>} />
                        <MenuButton key={4} keyValue={4} name={"Format"} component={ <Format idx={4}/>} /> 
                        <MenuButton key={5} keyValue={5} name={"Tools"} component={ <Tools idx={5}/>} /> 
                        <MenuButton key={6} keyValue={6} name={"Add-ons"} component={ <AddOns idx={6}/>} />
                        <MenuButton key={7} keyValue={7} name={"Help"} component={ <Help idx={7}/>} />
                    </div>
    
                    {/* dialaog menu for small screen */}
                    {
                        openCloseButtonForMenuBarResponsiveness && (
                    
                        <div className="flex flex-row md:hidden relative top-7 z-10">
                            <div className="absolute flex flex-col bg-white w-28 shadow-xl">
                                <MenuButton key={0} keyValue={0} name={"File"} component={ <File idx={0}/>} /> 
                                <MenuButton key={1} keyValue={1} name={"Edit"} component={ <Edit idx={1}/>} /> 
                                <MenuButton key={2} keyValue={2} name={"View"} component={ <View idx={2}/>} /> 
                                <MenuButton key={3} keyValue={3} name={"Insert"} component={ <Insert idx={3}/>} />
                                <MenuButton key={4} keyValue={4} name={"Format"} component={ <Format idx={4}/>} /> 
                                <MenuButton key={5} keyValue={5} name={"Tools"} component={ <Tools idx={5}/>} /> 
                                <MenuButton key={6} keyValue={6} name={"Add-ons"} component={ <AddOns idx={6}/>} />
                                <MenuButton key={7} keyValue={7} name={"Help"} component={ <Help idx={7}/>} />
                            </div>
                        </div>)
                    }
    
                        <Menu className="text-gray-500 relative" sx={{display:{xs:"block",md:"none"}}} onClick={()=>{ setOpenCloseButtonForMenuBarResponsiveness(!openCloseButtonForMenuBarResponsiveness)}} />
                </div>
 
            </div>
        </div>

        <div className="flex-none md:flex justify-center items-center md:flex-row flex-col relative left-4 md:left-0">
            {document?.userId===user?.id && (<ShareDocumentModel/>) }
            <div className=" flex ">
                <CurrentUsers/>
                <UserDropdown/>
            </div>
            
        </div>

    </div>)
}

const MenuButton = ({ keyValue,  name, component}:{ keyValue:number, name:string, component:JSX.Element}) =>{
    
    const dispatch = useDispatch<AppDispatch>();
    const { activeDialogForMenuUseBoolean, activeDialogForMenuUseIdx } = useSelector( ( state:{ component:ComponentStateType})=>state.component);
    const { editorState, setEditorState} = useContext(EditorContext);


    const buttonBGColor = (activeDialogForMenuUseBoolean && activeDialogForMenuUseIdx===keyValue) ? "bg-gray-100" : "bg-white";
    

    return(
        <div className="relative">
            <button 
                className={` ${buttonBGColor} hover:ring-1 hover:ring-gray-200 text-sm font-semibold text-gray-700 py-0.5 px-2 mx-1 rounded hover:bg-gray-100 hover:text-gray-900 relative  whitespace-nowrap`}
                onClick={()=>{ 
                    dispatch(setActiveDialogForMenuUseBoolean(true));     
                    dispatch( setActiveDialogForMenuUseIdx(keyValue))        
    
                    //when i click on menu then selection color is gone , so i need to manage it
                    const selectionState = editorState.getSelection();
                    const newEditorState = EditorState.forceSelection(editorState, selectionState);
                    setEditorState(newEditorState);
      
                }}
                onMouseEnter={()=>{ dispatch(setActiveDialogForMenuUseIdx(keyValue)) }}
            >
            {name}
            </button>
        { component}
        </div>
    )
} 

const CurrentUsers = memo(() => {

    const { currentUsers} = useSelector((state:{ document: DocumentStateType})=>state.document );
    const { user} = useSelector((state:{ user: UserStateType})=>state.user );
    const [ rangomColor, colors] = useRandomColor();

    return(
        <div className="max-w-80 h-15 hover:overflow-scroll overflow-y-hidden block md:block">
            
            <div className="m-0 md:m-2 flex items-none md:items-center justify-none md:justify-center w-16 overflow-y-scroll md:w-auto md:overflow-y-visible "> 
                {
                    currentUsers?.map((cUser, i)=>{
                        return(
                            <>

                            { user?.email!==cUser && (<div key={i}  className={`h-8 h-8 md:w-10 md:h-10 ${colors[i]} rounded-full relative m-1`}>
                                
                                <h1 className="text-xl md:text-2xl text-center h-full text-white rounded-fill h-8 w-8 md:w-10 md:h-10">
                                    { cUser?.charAt(0).toUpperCase()}
                                </h1>
                            </div> )

                            }
                         
                           

                            </>
                        )
                       
                    })
                }

          </div>

        </div>
    )
})
