import { convertToRaw, Editor, EditorState} from "draft-js";
import { useContext, useEffect, useRef } from "react";
import { EditorContext } from "../../../context/editor-context";
import "draft-js/dist/Draft.css";
import "../../CSS/DocumentEditor.css";
import { SocketEvent } from "../../../types/enums/SocketEvents";
import { SocketContext } from "../../../context/socket-context";
import { useSelector } from "react-redux";
import { DocumentStateType, UserStateType } from "../../../vite-env";
import { useParams } from "react-router";

const DocumentEditor = () =>{

    const { editorState, setEditorState, editorRef, handleEditorChange} = useContext(EditorContext);
    

    //current users existance in the socket-----------------
    const  { user} = useSelector(( state:{ user:UserStateType})=>state.user);
    const { document} = useSelector(( state:{ document:DocumentStateType})=>state.document)
    const params = useParams();
    const socket = useContext( SocketContext).socket;


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
   
    
   
        
     
    //-----------------------------------------------------


    

    return(
        <>
        <div className="border-2 border-black mt-6">
           
            <Editor 
                editorState={ editorState} 
                onChange={( editorState)=>{ setEditorState(editorState); handleEditorChange(editorState)}} 
                ref={editorRef} 
                placeholder="Start Your Journey... "
                // customStyleMap={colorStyleMap}
                // blockRendererFn={ mediaBlockRenderer}
            />
        </div>
        </>
    )

}

export { DocumentEditor};









































/*

import { useState, useEffect, Ref, useRef } from "react"
import { AtomicBlockUtils, convertToRaw, Editor, EditorState, RichUtils, convertFromRaw} from"draft-js";
import "draft-js/dist/Draft.css";

const DocumentEditor = ()=>{

    const [ editorState, setEditorState] = useState(EditorState.createEmpty());


    const editorRef = useRef(null);

    //----------------------------------------------------
    //colors list for Editor
    const colorStyleMap = {
        red: {
          color: 'rgba(255, 0, 0, 1.0)',
        },
        orange: {
          color: 'rgba(255, 127, 0, 1.0)',
        },
        yellow: {
          color: 'rgba(180, 180, 0, 1.0)',
        },
        green: {
          color: 'rgba(0, 180, 0, 1.0)',
        },
        blue: {
          color: 'rgba(0, 0, 255, 1.0)',
        },
        indigo: {
          color: 'rgba(75, 0, 130, 1.0)',
        },
        violet: {
          color: 'rgba(127, 0, 255, 1.0)',
        },
      };

    //colors list
    const colorsList = [
        {
            color: "red",
            label: "RED"
        },
        {
            color: "orange",
            label: "ORANGE"
        },
        {
            color: "yellow",
            label: "YELLOW"
        },
        {
            color: "green",
            label: "GREEN"
        },
        {
            color: "blue",
            label: "BLUE"
        },
        {
            color: "indigo",
            label: "INDIGO"
        },
        {
            color: "violet",
            label: "VIOLET"
        },
    ];
      
    //----------------------------------------------------
    //text style
    const handleTextStyle = ( style:string)=>{

        const newState = RichUtils.toggleInlineStyle(editorState, style);
        setEditorState(newState);
    }

    //----------------------------------------------------
    //undo
    const handleUpdoBtn = ()=>{
        setEditorState( EditorState.undo( editorState));
    }

    //----------------------------------------------------
    //redo
    const handleRedoBtn = ()=>{
        setEditorState( EditorState.redo( editorState));
    }

    //----------------------------------------------------
    //change colors
    const handleColorChange = (color:string)=>{
        setEditorState( RichUtils.toggleInlineStyle(editorState, color));
    }

    //----------------------------------------------------
    const dsf = ( )=>{
        setEditorState( EditorState.moveSelectionToEnd);
    };

    //----------------------------------------------------
    //media block renderer
    const [ srcLink, setSrcLink] = useState<string | null | ArrayBuffer>("");

    const MediaComponent = ( props) =>{

        const entity = props.contentState.getEntity(props.block.getEntityAt(0));

        const { src} = entity.getData();
        const type = entity.getType();

        // "https://unsplash.com/photos/a-lion-lying-down-sohngDnKTf8"

        return <img src={src} alt={type}/>
      
    }
    
    const mediaBlockRenderer = ( block)=>{

        if(block.getType() === 'atomic'){
            return(
                { component: MediaComponent,
                    editable: false,
                }
            )
        }

        return null;
    };

    const insertImage=(url)=>{

        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity('IMAGE','IMMUTABLE', { src:url});
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity});
        setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '));
    }

    const handleInsertImage = ()=>{
        insertImage(srcLink);
    };

    const handleUploadImage = (e)=>{
        console.log(e.target.files);
        const reader = new FileReader();
        reader.onload = () =>{
            if(reader.readyState===2){
                console.log(reader.result);
                setSrcLink(reader.result);
            }
        };
        reader.readAsDataURL(e.target.files[0]);
        
    }

    console.log(editorState);
    console.log(editorState.getCurrentContent())
    console.log( convertToRaw(editorState.getCurrentContent()));
    console.log( JSON.stringify(convertToRaw(editorState.getCurrentContent()))  );


    return(
        <>
        <div>
            <div>
                <button className="border-2 py-2 px-4" onClick={()=>handleTextStyle('BOLD')}> bold</button>
                <button className="border-2 py-2 px-4" onClick={()=>handleTextStyle('ITALIC')}>italic</button>
            </div>
            
            <div>
            {
                colorsList.map((colorObj)=>{
                    return(
                        <button className="border-2 py-2 px-4" onClick={()=>handleColorChange(colorObj.color)}>{colorObj.label}</button>
                    )
                })
            }
            </div>

            <div>
                <button className="border-2 py-2 px-4" onClick={handleUpdoBtn}>updo</button>
                <button className="border-2 py-2 px-4" onClick={handleRedoBtn}>redo</button>
            </div>

            <div className="border-2 border-red-500 ">
                <button onClick={ handleInsertImage}>Add Image</button>
                <input type="file" onChange={handleUploadImage}/>
            </div>

        </div>
        
        <div className="border-2 border-black">
            <Editor 
                editorState={ editorState} 
                onChange={setEditorState} 
                ref={editorRef} 
                placeholder="Start Your Journey... "
                customStyleMap={colorStyleMap}
                blockRendererFn={ mediaBlockRenderer}
            />
        </div>
        </>
    ) 

}


export { DocumentEditor};


*/
































































