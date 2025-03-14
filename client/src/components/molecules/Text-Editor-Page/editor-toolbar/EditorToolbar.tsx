import { East, West, FormatBold, FormatItalic, FormatUnderlined, FormatClear, FormatColorReset, FormatColorText, DriveFileRenameOutline} from "@mui/icons-material";
import { ContentState, EditorState, Modifier, RichUtils} from "draft-js"
import { MouseEventHandler, useContext, useEffect, useRef } from "react";
import { EditorContext } from "../../../../context/editor-context";
import ColorPalette from "../../../atoms/Text-Editor-Page/color-palette/ColorPalette";
import { useDispatch, useSelector } from "react-redux";
import { ComponentStateType, setIsColorPaletteOpen, setIsHighlightColorPaletteOpen } from "../../../../redux/Slices/componentSlice";
import { AppDispatch } from "../../../../redux/store";
import HighlightColorPalette from "../../../atoms/Text-Editor-Page/color-palette/HighlightColorPalette";

export default function EditorToolbar(){

    const { editorState, setEditorState, handleEditorChange } = useContext(EditorContext);
    const dispatch = useDispatch<AppDispatch>();
    const colorPaletteRef  = useRef<HTMLDivElement>(null);
    const highlightColorPaletteRef  = useRef<HTMLDivElement>(null);
    const { isColorPaletteOpen, isHighlightColorPaletteOpen} = useSelector( (state:{ component:ComponentStateType})=>state.component);

    //formats
    const handleFormatFunc = ( command:string)=>{

        const newEditorState = RichUtils.toggleInlineStyle( editorState , command);
        setEditorState( newEditorState);

        //styles realtime and database update
        handleEditorChange(newEditorState);
    }



    //clear formating
    const handleClearFormating = ()=>{

        //---- this is to remove all formatting even undo or redo, and create new state
        // const currentContent = editorState.getCurrentContent();
        // const plainText = currentContent.getPlainText();
        // const newContentState = ContentState.createFromText( plainText);
        // const newEditorState = EditorState.createWithContent( newContentState);
        // setEditorState( newEditorState);


        const selection = editorState.getSelection();
        let contentState = editorState.getCurrentContent();
        
        contentState = Modifier.removeInlineStyle( contentState, selection, 'BOLD');
        contentState = Modifier.removeInlineStyle( contentState, selection, 'ITALIC');
        contentState = Modifier.removeInlineStyle( contentState, selection, 'UNDERLINE');

        
        setEditorState( EditorState.push( editorState, contentState, "change-inline-style"));

        //styles realtime and database update
        handleEditorChange( EditorState.push( editorState, contentState, "change-inline-style"));

    }

    //clear highlight color and color formatting
    const handleHighlightColorClearFormatting = ()=>{

        const selection = editorState.getSelection();
        let contentState = editorState.getCurrentContent();
        
        contentState = Modifier.applyInlineStyle( contentState, selection, 'black');
        contentState = Modifier.applyInlineStyle( contentState, selection, 'highlightWhite');

        
        setEditorState( EditorState.push( editorState, contentState, "change-inline-style"));
        
        //styles realtime and database update
        handleEditorChange( EditorState.push( editorState, contentState, "change-inline-style"));


    }

    
    //undo 
    const undoHandler = ()=>{
        setEditorState( EditorState.undo( editorState));

        //styles realtime and database update
        handleEditorChange( EditorState.undo( editorState));


    }

    //redo
    const redoHandler = ()=>{
        setEditorState( EditorState.redo( editorState));

        //styles realtime and database update
        handleEditorChange( EditorState.redo( editorState));
    }


    //color palette dialog close , if click outside the palette
    useEffect(()=>{
    
            const colorPaletteDialogOpenClose = (e:MouseEvent)=>{
    
                if(!colorPaletteRef.current?.contains( e.target as HTMLDivElement)){
                    dispatch( setIsColorPaletteOpen( false));
                }
            }
    
            window.addEventListener( "click", colorPaletteDialogOpenClose);
    
            return ()=>{
                window.removeEventListener( "click", colorPaletteDialogOpenClose);
            }
    
    },[]);


    // highlight color palette dialog close , if click outside the palette
    useEffect(()=>{
    
            const highlightColorPaletteDialogOpenClose = (e:MouseEvent)=>{
    
                if(!highlightColorPaletteRef.current?.contains( e.target as HTMLDivElement)){
                    dispatch( setIsHighlightColorPaletteOpen( false));
                }
            }
    
            window.addEventListener( "click", highlightColorPaletteDialogOpenClose);
    
            return ()=>{
                window.removeEventListener( "click", highlightColorPaletteDialogOpenClose);
            }
    
    },[]);


    return( 
        <div className="flex bg-blue-50 rounded-full">
          <div className=" w-28 flex">
            <div className=" w-3/6 flex items-center justify-end border-r-2">
                <West sx={{ fontSize:"22px", color:"gray" , "&:hover":{color:"black"}, marginRight:"5px"}} onClick={undoHandler}/>
            </div>
            <div className=" w-3/6 flex items-center justify-start"> 
                <East sx={{ fontSize:"22px", color:"gray" , "&:hover":{color:"black"}, marginLeft:"5px"}} onClick={redoHandler} />
            </div>
          </div>
          <div className=" h-10 w-full flex justify-start"  >
              <IconBox icon={<FormatBold sx={{fontSize:"22px", color:"rgba(0, 0, 0, 0.76)",margin:"3px" }}/>}  onClick={()=>{ handleFormatFunc("BOLD") } }/>
              <IconBox icon={<FormatItalic sx={{fontSize:"22px", color:"rgba(0, 0, 0, 0.76)",margin:"3px" }}/>}  onClick={()=>{ handleFormatFunc("ITALIC") } } />
              <IconBox icon={<FormatUnderlined sx={{fontSize:"22px", color:"rgba(0, 0, 0, 0.76)",margin:"3px" }}/>}  onClick={()=>{ handleFormatFunc("UNDERLINE") } } />
              <IconBox icon={<FormatClear sx={{fontSize:"22px", color:"rgba(0, 0, 0, 0.76)",margin:"3px" }}/>}  onClick={()=>{ handleClearFormating()} }  />
              <IconBox icon={<FormatColorReset sx={{fontSize:"22px", color:"rgba(0, 0, 0, 0.76)",margin:"3px" }}/>}  onClick={handleHighlightColorClearFormatting}  />

              <div ref={colorPaletteRef} className="w-10 h-10 flex justify-center items-center relative">
                <div onClick={()=>{ dispatch( setIsColorPaletteOpen(!isColorPaletteOpen))}} className="rounded hover:bg-blue-300 relative ">
                  <FormatColorText sx={{fontSize:"22px", color:"rgba(0, 0, 0, 0.76)",margin:"3px" }}/>
                </div> 
                {  isColorPaletteOpen && (
                        <div className="absolute top-10 -left-[140px] md:top-10 md:left-0 ">
                            <ColorPalette/>
                        </div>
                    )
                }
              </div>
              
              <div ref={ highlightColorPaletteRef} className="w-10 h-10 flex justify-center items-center relative">
                <div onClick={()=>{ dispatch( setIsHighlightColorPaletteOpen(!isHighlightColorPaletteOpen)) }} className="rounded hover:bg-blue-300 relative ">
                  <DriveFileRenameOutline sx={{fontSize:"22px", color:"rgba(0, 0, 0, 0.76)",margin:"3px" }}/>
                </div> 
                {  isHighlightColorPaletteOpen && (
                        <div className="absolute top-10 -left-[175px] md:top-10 md:left-0 ">
                            <HighlightColorPalette/>
                        </div>
                    )
                }
              </div>



              
              
          </div>
        </div>
    )
}

const IconBox = ( { icon, onClick}:{ icon:JSX.Element, onClick:MouseEventHandler<HTMLDivElement>})=>{

    return(
        <div  className="w-10 h-10 flex justify-center items-center" onClick={onClick}>
            <div className="rounded hover:bg-blue-300">{icon}</div>
        </div>
    )
}