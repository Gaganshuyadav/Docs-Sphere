import { MenuDialog } from "./DialogForAll/Menu-Dialog";
import { setActiveDialogForMenuUseBoolean } from "../../../../redux/Slices/componentSlice";
import { useDispatch } from "react-redux";
import { MenuItemsButton } from "./ButtonForAll/MenuItemButtons";
import { useState } from "react";
import ContentDialog from "./ContentDialog/ContentDialog";

const AddOns = ({ idx }: { idx: number }) => {

    const dispatch = useDispatch();

    const [getAddOnes, setGetAddOnes] = useState(false);

    const handleGetAddOnes = (getAddOnes: boolean) => {
        setGetAddOnes(getAddOnes);
    };

    return (
        <>
            <MenuDialog
                idx={idx}
                component={(
                    <div className="bg-white text-gray-500 font-semibold tracking-wide text-sm whitespace-nowrap">

                        {/* <MenuItemsButton item={"Manage Add-ones"} onClickHandler={()=>{ dispatch( setActiveDialogForMenuUseBoolean(false))}} /> */}
                        <MenuItemsButton item={"Get Add-ones"} onClickHandler={() => { setGetAddOnes(!getAddOnes)} } />
                        {getAddOnes && (
                            <ContentDialog
                                setFunction={handleGetAddOnes}
                                component={
                                    <div className=" p-4 max-h-[70vh] max-w-[70vw] overflow-y-scroll lg:px-20 py-3 md:py-10">
                                        <h1 className="font-bold text-xl text-gray-700 mb-2">Add Extentions</h1>
                                        <p className="no-wrap font-semibold text-gray-600">
                                            Currently Unavailable
                                        </p>
                                    </div>
                                }
                            />)}
        
                        {/* <MenuItemsButton item={"Enable/Disable Add-ons"} onClickHandler={()=>{ dispatch( setActiveDialogForMenuUseBoolean(false))}} />
                        <MenuItemsButton item={"Update Add-ons"} onClickHandler={()=>{ dispatch( setActiveDialogForMenuUseBoolean(false))}} />
                        <MenuItemsButton item={"Delete"} onClickHandler={()=>{ dispatch( setActiveDialogForMenuUseBoolean(false))}} /> */}

                    </div>
                )}
            />
        </>
    )
}

export { AddOns };