import { MenuDialog } from "./DialogForAll/Menu-Dialog";
import { setActiveDialogForMenuUseBoolean } from "../../../../redux/Slices/componentSlice";
import { useDispatch } from "react-redux";
import { MenuItemsButton } from "./ButtonForAll/MenuItemButtons";

const Insert = ({ idx}:{idx:number}) =>{

  const dispatch = useDispatch();

    return(
        <>
        <MenuDialog 
          idx={idx}
          component={(
            <div className=" relative bg-white text-gray-500 font-semibold tracking-wide text-sm whitespace-nowrap">
              <MenuItemsButton item={"Insert Image"} onClickHandler={()=>{ dispatch( setActiveDialogForMenuUseBoolean(false)) }} />
              <MenuItemsButton item={"Insert Link"} onClickHandler={()=>{ dispatch( setActiveDialogForMenuUseBoolean(false)) }} />
              <MenuItemsButton item={"Insert Date/Time"} onClickHandler={()=>{ dispatch( setActiveDialogForMenuUseBoolean(false)) }} />
            </div>
          )}
        />
        </>
    )
}

export { Insert};