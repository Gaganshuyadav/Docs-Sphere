import { useDispatch, useSelector } from "react-redux";
import { MenuDialog } from "./DialogForAll/Menu-Dialog";
import { setActiveDialogForMenuUseBoolean } from "../../../../redux/Slices/componentSlice";
import { MenuItemsButton } from "./ButtonForAll/MenuItemButtons";
import { useContext } from "react";
import { EditorContext } from "../../../../context/editor-context";
import { ContentState, convertToRaw, EditorState, Modifier, SelectionState } from "draft-js";

const Edit = ( { idx}:{idx:number}) =>{

    const dispatch = useDispatch(); 
    const { editorState, setEditorState, editorRef} = useContext( EditorContext);


    //undo -----------------
    const undoHandler = ()=>{
      setEditorState( EditorState.undo( editorState));
      dispatch( setActiveDialogForMenuUseBoolean(false));

    } 

    //redo -----------------
    const redoHandler = ()=>{
        setEditorState( EditorState.redo( editorState));
        dispatch( setActiveDialogForMenuUseBoolean(false));
    }

    //handle delete text -----------------
    const handleDelete = ()=>{

      const contentState = editorState.getCurrentContent();
      const selection = editorState.getSelection()
       
        const afterDeleteContent = Modifier.removeRange( contentState, selection, "backward");

        setEditorState( EditorState.push( editorState, afterDeleteContent, "remove-range"));
        dispatch( setActiveDialogForMenuUseBoolean(false));

    }

    //cut text ----------------- 
    const handleCutText = async()=>{

      const contentState = editorState.getCurrentContent();
      const selectionState = editorState.getSelection();

      //get text from selection

      const blocks = convertToRaw(contentState).blocks;

      let selectedText = "";
      let isWithinSelection = false;
      blocks.forEach((block)=>{
          
        if( block.key===selectionState.getAnchorKey() && block.key===selectionState.getEndKey()){
          selectedText += block.text.slice( selectionState.getAnchorOffset() , selectionState.getFocusOffset());               
        }
        else if( block.key===selectionState.getAnchorKey()){
          isWithinSelection = true;
          selectedText += block.text.slice( selectionState.getAnchorOffset());
          selectedText += "\n";
        }
        else if( block.key===selectionState.getEndKey()){
          isWithinSelection = false;
          selectedText += block.text.slice( 0 , selectionState.getEndOffset());
          selectedText += "\n";
        }
        else if(isWithinSelection){
          selectedText += block.text;
          selectedText += "\n";
        }
        else{
          //do nothing
        }
  })


      //copy text in clipboard 
      try{

        // clipboard writeText is allowed in laptop but some android phones not allow it and state is denied,  for that we need to make create element and then copy it
        navigator.permissions.query( { name: "clipboard-write" as PermissionName})
        .then(async ( permission)=>{

            if( permission.state==="denied"){

                const textArea = window.document.createElement("textarea");
                textArea.value = selectedText;
                window.document.body.appendChild(textArea);
                textArea.select();
                window.document.execCommand('copy');
                window.document.body.removeChild(textArea);
            }
            else{

              await window.navigator.clipboard.writeText( selectedText);          
          }

        })
        .catch((err)=>{
          console.log("clipboard permission check error");
        });

      }
      catch(err){
        console.log("copy selected text error");
      }

      
      
      // now remove selected text
      const aferDeletedContent = Modifier.removeRange( contentState, selectionState, "backward");
      setEditorState( EditorState.push( editorState, aferDeletedContent, "remove-range"));


      dispatch( setActiveDialogForMenuUseBoolean(false));

    }

    //copy text -----------------
    const handleCopyText = async ()=>{

        const contentState = editorState.getCurrentContent();
        const selectionState = editorState.getSelection();
  
        //get text from selection
  
        const blocks = convertToRaw(contentState).blocks;

        let selectedText = "";
        let isWithinSelection = false;
        blocks.forEach((block)=>{
          
            if( block.key===selectionState.getAnchorKey() && block.key===selectionState.getEndKey()){
              selectedText += block.text.slice( selectionState.getAnchorOffset() , selectionState.getFocusOffset());               
            }
            else if( block.key===selectionState.getAnchorKey()){
              isWithinSelection = true;
              selectedText += block.text.slice( selectionState.getAnchorOffset());
              selectedText += "\n";
            }
            else if( block.key===selectionState.getEndKey()){
              isWithinSelection = false;
              selectedText += block.text.slice( 0 , selectionState.getEndOffset());
              selectedText += "\n";
            }
            else if(isWithinSelection){
              selectedText += block.text;
              selectedText += "\n";
            }
            else{
              //do nothing
            }
      })



      //copy text in clipboard 
      try{

        // clipboard writeText is allowed in laptop but some android phones not allow it and state is denied,  for that we need to make create element and then copy it
        navigator.permissions.query( { name: "clipboard-write" as PermissionName})
        .then(async ( permission)=>{

            if( permission.state==="denied"){

                const textArea = window.document.createElement("textarea");
                textArea.value = selectedText;
                window.document.body.appendChild(textArea);
                textArea.select();
                window.document.execCommand('copy');
                window.document.body.removeChild(textArea);
            }
            else{

              await window.navigator.clipboard.writeText( selectedText);          
          }

        })
        .catch((err)=>{
          console.log("clipboard permission check error");
        });

      }
      catch(err){
        console.log("copy selected text error");
      }



      dispatch( setActiveDialogForMenuUseBoolean(false))


    }


    //paste text -----------------
    const handlePasteText = async ()=>{
      
        //take content from clipboard
        const clipboardText = await window.navigator.clipboard.read()
         
         let getText;
         for( let item of clipboardText){
          
            const blob = await item.getType("text/plain");
            getText = await blob.slice().text() as string|null;
         }

         if(!getText){ 
          return;
        }

        const contentState = editorState.getCurrentContent();
        const selection = editorState.getSelection();
       
        const afterPastingContent = Modifier.replaceText( contentState, selection, getText );

        setEditorState( EditorState.push( editorState, afterPastingContent, "remove-range"));
        dispatch( setActiveDialogForMenuUseBoolean(false));


    }
    

    //select all text -----------------
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
            <div className="bg-white text-gray-500 font-semibold tracking-wide text-sm whitespace-nowrap relative">
              <MenuItemsButton item={"Undo"} onClickHandler={undoHandler} />
              <MenuItemsButton item={"Redo"} onClickHandler={redoHandler} />
              <MenuItemsButton item={"Cut"} onClickHandler={ handleCutText} />
              <MenuItemsButton item={"Copy"} onClickHandler={handleCopyText}/>
              <MenuItemsButton item={"Paste"} onClickHandler={handlePasteText} />
              <MenuItemsButton item={"Delete"} onClickHandler={handleDelete} />
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