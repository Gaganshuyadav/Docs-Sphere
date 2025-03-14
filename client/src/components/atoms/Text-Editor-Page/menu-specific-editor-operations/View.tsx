import { MenuDialog } from "./DialogForAll/Menu-Dialog";
import { setActiveDialogForMenuUseBoolean } from "../../../../redux/Slices/componentSlice";
import { useDispatch } from "react-redux";
import { MenuItemsButton } from "./ButtonForAll/MenuItemButtons";

const View = ({ idx}:{idx:number}) =>{

    const dispatch = useDispatch();

    return(
        <>
        <MenuDialog 
          idx={idx}
          component={(
            <div className="bg-white text-gray-500 font-semibold tracking-wide text-sm whitespace-nowrap relative">
              {/* <MenuItemsButton item={"Zoom In"} onClickHandler={() => { dispatch(setActiveDialogForMenuUseBoolean(false)) }} />
              <MenuItemsButton item={"Zoom Out"} onClickHandler={() => { dispatch(setActiveDialogForMenuUseBoolean(false)) }} /> */}
            </div>
          )}
        />
        </>
    )
}

export { View};
