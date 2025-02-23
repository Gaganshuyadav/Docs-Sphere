import { useDispatch, useSelector } from "react-redux";
import { ComponentStateType } from "../../../../../redux/Slices/componentSlice";


const MenuDialog = ( { idx, component}:{ idx:number, component: JSX.Element}) =>{
    
    const { activeDialogForMenuUseBoolean, activeDialogForMenuUseIdx} = useSelector( ( state:{ component:ComponentStateType})=>state.component);
    
    return(
        <>
        {
        activeDialogForMenuUseBoolean && activeDialogForMenuUseIdx===idx && (
        <div className="bg-white border-2 border-gray-200 rounded-md border-black absolute py-2 left-0 z-10 top-6"> 
            {component}
        </div>)
        }
        </>
    )
}

export { MenuDialog};