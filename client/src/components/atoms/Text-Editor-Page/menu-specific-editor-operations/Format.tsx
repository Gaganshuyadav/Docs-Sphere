import { MenuDialog } from "./DialogForAll/Menu-Dialog";
import { setActiveDialogForMenuUseBoolean } from "../../../../redux/Slices/componentSlice";
import { useDispatch } from "react-redux";
import { MenuItemsButton } from "./ButtonForAll/MenuItemButtons";
import { useContext } from "react";
import { EditorContext } from "../../../../context/editor-context";
import {RichUtils } from "draft-js";

export default function Format({ idx }: { idx: number }) {

    const dispatch = useDispatch();
    const { editorState, setEditorState, handleEditorChange} = useContext(EditorContext);
    
    
    const handleTextFormating = ( command:string) =>{
        const newState = RichUtils.toggleInlineStyle( editorState, command);
        setEditorState(newState);
        //styles realtime and database update
        handleEditorChange(newState);
    };

    return (
        <>
            <MenuDialog
                idx={idx}
                component={(
                    <div className="bg-white text-gray-500 font-semibold tracking-wide text-sm whitespace-nowrap relative">
                        <MenuItemsButton item={"Bold"} onClickHandler={ ()=>{ handleTextFormating("BOLD") } } />
                        <MenuItemsButton item={"Italic"} onClickHandler={()=>{ handleTextFormating("ITALIC")}} />
                        <MenuItemsButton item={"Line Height"} onClickHandler={()=>{ dispatch( setActiveDialogForMenuUseBoolean(false))}} />
                        <MenuItemsButton item={"Underline"} onClickHandler={()=>{ handleTextFormating("UNDERLINE")} } />
                        <MenuItemsButton item={"H1"} onClickHandler={()=>{ dispatch( setActiveDialogForMenuUseBoolean(false))}} />
                        <MenuItemsButton item={"H2"} onClickHandler={()=>{ dispatch( setActiveDialogForMenuUseBoolean(false))}} />
                        <MenuItemsButton item={"Bullet List"} onClickHandler={()=>{ dispatch( setActiveDialogForMenuUseBoolean(false))}} />
                        <MenuItemsButton item={"Numbered List"} onClickHandler={()=>{ dispatch( setActiveDialogForMenuUseBoolean(false))}} />
                    </div>
                )}
            />
        </>
    )
}