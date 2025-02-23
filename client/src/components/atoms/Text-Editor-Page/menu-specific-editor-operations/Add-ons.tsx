import { MenuDialog } from "./DialogForAll/Menu-Dialog";
import { setActiveDialogForMenuUseBoolean } from "../../../../redux/Slices/componentSlice";
import { useDispatch } from "react-redux";
import { MenuItemsButton } from "./ButtonForAll/MenuItemButtons";

const AddOns = ({ idx }: { idx: number }) => {

    const dispatch = useDispatch();


    return (
        <>
            <MenuDialog
                idx={idx}
                component={(
                    <div className="bg-white text-gray-500 font-semibold tracking-wide text-sm whitespace-nowrap">

                        <MenuItemsButton item={"Manage Add-ones"} onClickHandler={()=>{ dispatch( setActiveDialogForMenuUseBoolean(false))}} />
                        <MenuItemsButton item={"Get Add-ones"} onClickHandler={()=>{ dispatch( setActiveDialogForMenuUseBoolean(false))}} />
                        <MenuItemsButton item={"Enable/Disable Add-ons"} onClickHandler={()=>{ dispatch( setActiveDialogForMenuUseBoolean(false))}} />
                        <MenuItemsButton item={"Update Add-ons"} onClickHandler={()=>{ dispatch( setActiveDialogForMenuUseBoolean(false))}} />
                        <MenuItemsButton item={"Delete"} onClickHandler={()=>{ dispatch( setActiveDialogForMenuUseBoolean(false))}} />
                    
                    </div>
                )}
            />
        </>
    )
}

export { AddOns };