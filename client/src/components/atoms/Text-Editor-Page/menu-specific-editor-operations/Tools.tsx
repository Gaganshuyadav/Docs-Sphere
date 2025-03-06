import { MenuDialog } from "./DialogForAll/Menu-Dialog";
import { useDispatch } from "react-redux";
import { setActiveDialogForMenuUseBoolean } from "../../../../redux/Slices/componentSlice";
import { AppDispatch } from "../../../../redux/store";
import { MenuItemsButton } from "./ButtonForAll/MenuItemButtons";


const Tools = ( { idx}:{idx:number}) =>{

  const dispatch = useDispatch<AppDispatch>(); 

    return(
        <>
        <MenuDialog
          idx={idx} 
          component={(
            <div className="relative bg-white text-gray-500 font-semibold tracking-wide text-sm whitespace-nowrap">
              <MenuItemsButton item={"Spell Check"} onClickHandler={() => { dispatch(setActiveDialogForMenuUseBoolean(false)) }} />
              <MenuItemsButton item={"Grammer Check"} onClickHandler={() => { dispatch(setActiveDialogForMenuUseBoolean(false)) }} />
              <MenuItemsButton item={"Word Count"} onClickHandler={() => { dispatch(setActiveDialogForMenuUseBoolean(false)) }} />
              <MenuItemsButton item={"Keyboard Shortcuts"} onClickHandler={() => { dispatch(setActiveDialogForMenuUseBoolean(false)) }} />
            </div>
          )}
        />
        </>
    )
}

export { Tools};

