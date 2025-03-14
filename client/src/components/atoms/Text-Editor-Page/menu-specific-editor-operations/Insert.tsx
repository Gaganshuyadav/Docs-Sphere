import { MenuDialog } from "./DialogForAll/Menu-Dialog";
import { setActiveDialogForMenuUseBoolean } from "../../../../redux/Slices/componentSlice";
import { useDispatch } from "react-redux";
import { MenuItemsButton } from "./ButtonForAll/MenuItemButtons";
import { ChangeEvent, ChangeEventHandler, useContext } from "react";
import { EditorContext } from "../../../../context/editor-context";
import { AtomicBlockUtils, EditorState } from "draft-js";
import { ToastContext } from "../../../../context/toast-context";

const Insert = ({ idx }: { idx: number }) => {

  const dispatch = useDispatch();
  const { editorState, setEditorState} = useContext(EditorContext);
  const { error} = useContext(ToastContext);

  const handleInsertImage = (e:ChangeEvent)=>{

    const target = e.target as HTMLInputElement;

    if(!target.files){ return;}

    if(target.files[0].size > 555000){
      error("Image size should not more than 500KB");
      return;
    }
    
    const reader = new FileReader();
        reader.onload = () =>{
            if(reader.readyState===2){
                const contentState = editorState.getCurrentContent();
                const contentStateWithEntity = contentState.createEntity('IMAGE','IMMUTABLE', { src:reader.result});
                const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
                const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity});
                setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, ' '));
            }
        };
        reader.readAsDataURL(target.files[0]);

    dispatch( setActiveDialogForMenuUseBoolean(false));
  }

  return (
    <>
      <MenuDialog
        idx={idx}
        component={(
          <div className=" relative bg-white text-gray-500 font-semibold tracking-wide text-sm whitespace-nowrap">
    
            <div
              className="px-4 py-1 hover:bg-gray-200 cursor-pointer relative overflow-hidden"
            >
              <p className="relative w-full relative flex ">
                <p className="relative">Insert Image</p>
                <input type="file" accept="image/*" onChange={handleInsertImage} className="absolute -top-2 -left-4 border-2 p-96" />
              </p>
            </div>

            {/* <MenuItemsButton item={"Insert Link"} onClickHandler={()=>{ dispatch( setActiveDialogForMenuUseBoolean(false)) }} />
              <MenuItemsButton item={"Insert Date/Time"} onClickHandler={()=>{ dispatch( setActiveDialogForMenuUseBoolean(false)) }} /> */}
          </div>
        )}
      />
    </>
  )
}

export { Insert };

