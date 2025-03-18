import { MenuDialog } from "./DialogForAll/Menu-Dialog";
import { setActiveDialogForMenuUseBoolean } from "../../../../redux/Slices/componentSlice";
import { useDispatch } from "react-redux";
import { MenuItemsButton } from "./ButtonForAll/MenuItemButtons";
import { useContext, useState } from "react";
import { EditorContext } from "../../../../context/editor-context";
import { RichUtils } from "draft-js";

export default function Format({ idx }: { idx: number }) {

    const dispatch = useDispatch();
    const { editorState, setEditorState, handleEditorChange } = useContext(EditorContext);
    const [isLineHeightDialogOpen, setIsLineHeightDialogOpen] = useState(false);
    const lineHeights = [1, 2, 3, 4, 5,];


    const handleTextFormating = (command: string) => {
        const newState = RichUtils.toggleInlineStyle(editorState, command);
        setEditorState(newState);
        //styles realtime and database update
        handleEditorChange(newState);
    };

    const handleSetLineHeight = ( lh:string) => {

        const newState = RichUtils.toggleInlineStyle(editorState, lh);
        setEditorState(newState);
        
        //styles realtime and database update
        handleEditorChange(newState);
    }

    return (
        <>
            <MenuDialog
                idx={idx}
                component={(
                    <div className="bg-white text-gray-500 font-semibold tracking-wide text-sm whitespace-nowrap relative">
                        <MenuItemsButton item={"Bold"} onClickHandler={() => { handleTextFormating("BOLD") }} />
                        <MenuItemsButton item={"Italic"} onClickHandler={() => { handleTextFormating("ITALIC") }} />
                        {/* line height */}
                        <div className="relative">
                            <div
                                className="px-4 py-1 hover:bg-gray-200 cursor-pointer relative"
                                onClick={() => { setIsLineHeightDialogOpen(!isLineHeightDialogOpen) }}
                            >
                                Line Height
                            </div>
                            {/* line height dialog */}
                            <div className="absolute bg-white left-[110px] top-2 border-2 rounded">
                                {
                                    isLineHeightDialogOpen && (
                                        <div>
                                            {
                                                lineHeights.map((height) => {
                                                    return (
                                                        <div
                                                            className="px-8 py-1 hover:bg-gray-200 cursor-pointer"
                                                            onClick={()=>{ handleSetLineHeight(`line-height-${height}`) }}
                                                        >
                                                            {height}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        <MenuItemsButton item={"Underline"} onClickHandler={() => { handleTextFormating("UNDERLINE") }} />
                       
                    </div>
                )}
            />
        </>
    )
}