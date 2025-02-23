import { useDispatch, useSelector } from "react-redux";
import { MenuDialog } from "./DialogForAll/Menu-Dialog";
import { setActiveDialogForMenuUseBoolean } from "../../../../redux/Slices/componentSlice";
import { MenuItemsButton } from "./ButtonForAll/MenuItemButtons";
import { useContext } from "react";
import { EditorContext } from "../../../../context/editor-context";
import { convertToRaw, EditorState, SelectionState } from "draft-js";

const Edit = ( { idx}:{idx:number}) =>{

    const dispatch = useDispatch(); 
    const { editorState, setEditorState, editorRef} = useContext( EditorContext);

    const handleSelectAllText = ()=>{

      const contentState = editorState.getCurrentContent();                       
          
      //the anchor key refers to a specific point in the editor's content that serves as a reference for text selection. It is part of the selection state, which is managed by Draft.js to keep track of the user's current selection within the editor( each line have different reference). 
      
      const selectionState = SelectionState.createEmpty( contentState.getFirstBlock().getKey()).merge({
        anchorKey: contentState.getFirstBlock().getKey(),                                                    //refers to the key of the bock where the selection starts.( Each block have a unique key). 
        anchorOffset: 0,                                                                                     //the position within the block where the selection starts
        focusKey: contentState.getLastBlock().getKey(),                                                      //key of the block where the selection ends
        focusOffset: contentState.getLastBlock().getLength()                                                 //the position where selection ends
      });

      const newEditorState = EditorState.forceSelection(editorState, selectionState);
      setEditorState(newEditorState);

      //to remove the menu dialog
      dispatch( setActiveDialogForMenuUseBoolean(false));

    };

/*-------------------------------------------------------------------------------------------------------------*/
    // const text1Ref = useRef<HTMLDivElement>(null); 
    // const text2Ref = useRef<HTMLDivElement>(null); 
    // const text3Ref = useRef<HTMLDivElement>(null); 
    // const textAllRef = useRef<HTMLDivElement>(null); 

    // const handleSelectText = () =>{

    //     const range = document.createRange();                                                  //common use of Range is to select text within a document, it is primarily associated with text selection, but its functionality exctends beyound just selecting text.( EX:- text selection, manipulate dom content, information about the range, select entire node(div), collapsing ranges)
        
    //     if(text1Ref.current && text2Ref.current && text3Ref.current && textAllRef.current){
    //         range.selectNodeContents(text2Ref.current);                                        //it is used to select the text by ref and sets it in the range object.
    //     }

    //     const selection = window.getSelection();                                                //it is used to retrive the current selection object from the window. this object represents the text selected by the user.
    //     selection?.removeAllRanges();                                                           //this line clears any existing selections. it ensures that only the new selection we are about to make it active.  
    //     selection?.addRange(range);                                                             //we add the newely created range to the selection.

    // };

    // const handleDeSelectText = ()=>{
    //     const selection = window.getSelection();
    //     selection?.removeAllRanges();

    // }

    /*-------------------------------------------------------------------------------------------------------------*/
    

    return(
        <>
        <MenuDialog 
          idx={idx}
          component={(
            <div className="bg-white text-gray-500 font-semibold tracking-wide text-sm whitespace-nowrap">
              <MenuItemsButton item={"Undo"} onClickHandler={()=>{ dispatch( setActiveDialogForMenuUseBoolean(false))}} />
              <MenuItemsButton item={"Redo"} onClickHandler={()=>{ dispatch( setActiveDialogForMenuUseBoolean(false))}} />
              <MenuItemsButton item={"Cut"} onClickHandler={()=>{ dispatch( setActiveDialogForMenuUseBoolean(false))}} />
              <MenuItemsButton item={"Copy"} onClickHandler={()=>{ dispatch( setActiveDialogForMenuUseBoolean(false))}} />
              <MenuItemsButton item={"Paste"} onClickHandler={()=>{ dispatch( setActiveDialogForMenuUseBoolean(false))}} />
              <MenuItemsButton item={"Delete"} onClickHandler={()=>{ dispatch( setActiveDialogForMenuUseBoolean(false))}} />
              <MenuItemsButton item={"Select All"} onClickHandler={handleSelectAllText} /> 
            </div>
          )}
        />



        {/* <div ref={textAllRef}>
        <div ref={text1Ref} className="border-2 border-red-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Illum inventore odio esse voluptatem nesciunt blanditiis 
            animi eveniet fugiat dolore corporis, quisquam accusantium
             ducimus commodi modi porro eos. Ipsum, ut unde?
        </div>
        <div ref={text2Ref} className="border-2 border-red-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Illum inventore odio esse voluptatem nesciunt blanditiis 
            animi eveniet fugiat dolore corporis, quisquam accusantium
             ducimus commodi modi porro eos. Ipsum, ut unde?
             </div>
        <div ref={text3Ref} className="border-2 border-red-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Similique, ad aliquam? Dolorum, quam at suscipit veritatis dolore eveniet eligendi porro velit 
            tenetur alias voluptatum iure minima pariatur quos inventore illum?
        </div>

        </div>
        <button onClick={ handleSelectText} className="border-2 w-28 p-4">Select Text</button>
        <button onClick={ handleDeSelectText} className="border-2 w-28 p-4">DeSelect Text</button> */}
        </>
    )
}

export { Edit};