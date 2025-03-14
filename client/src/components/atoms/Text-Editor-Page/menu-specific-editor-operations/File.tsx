import { MenuDialog } from "./DialogForAll/Menu-Dialog";
import { setActiveDialogForMenuUseBoolean } from "../../../../redux/Slices/componentSlice";
import { useDispatch } from "react-redux";
import { MenuItemsButton } from "./ButtonForAll/MenuItemButtons";
import { ToastContext } from "../../../../context/toast-context";
import { useContext } from "react";
import { useNavigate } from "react-router";

const File = ({ idx}:{idx:number}) =>{

    const dispatch = useDispatch();
    const { success} = useContext( ToastContext);
    const navigate = useNavigate();

    const handleSave = ()=>{
      success("document saved");
      dispatch( setActiveDialogForMenuUseBoolean(false));
    }

    const handleExitClose = ()=>{
      navigate(`/document/all/create`);
      dispatch( setActiveDialogForMenuUseBoolean(false));
    }

    return(
        <>
        <MenuDialog 
          idx={idx}
          component={(
            <div className="bg-white text-gray-500 font-semibold tracking-wide text-sm whitespace-nowrap relative">

              <MenuItemsButton item={"Save"} onClickHandler={handleSave} />
              <MenuItemsButton item={"Exit"} onClickHandler={handleExitClose} />
              <MenuItemsButton item={"Close"} onClickHandler={handleExitClose} />
                        
            </div>
          )}
        />
        </>
    )
}

export { File};