import { useContext } from "react";
import { ToastContext } from "../../../context/toast-context.tsx";
import { ToastInterface } from "../../../types/interfaces/Toast.tsx";
import  { Close, ErrorOutline, CheckCircleOutline, InfoOutlined, WarningAmber} from "@mui/icons-material";
import "../../../App.css";

export default function Toast( { id, color="primary", body, title, actions}:ToastInterface){

    const { removeToast} = useContext(ToastContext);


    const Toast_CLASSES:{ [ key: string]: { bgColor:string, border:string, iconColor: string, icon: JSX.Element } } = {
        primary: { bgColor: "bg-blue-400", border:"border-blue-700", iconColor:"text-blue-700", icon: <InfoOutlined style={{fontSize:"27px"}}/> },
        secondary: { bgColor: "bg-gray-400",  border:"border-black", iconColor:"text-black", icon: <InfoOutlined style={{fontSize:"27px"}}/> },
        success: { bgColor: "bg-green-400",  border:"border-green-700", iconColor:"text-green-700", icon: <CheckCircleOutline style={{fontSize:"27px"}}/> },
        warning: { bgColor: "bg-yellow-400", border:"border-yellow-700" , iconColor:"text-yellow-700", icon: <WarningAmber style={{fontSize:"27px"}}/> },
        danger: { bgColor: "bg-red-400",  border:"border-red-500", iconColor:"text-red-600", icon: <ErrorOutline style={{fontSize:"27px"}}/> },
    };

    
    return(
        <div className={`flex border-2 ${Toast_CLASSES[color].bgColor} ${Toast_CLASSES[color].border} py-3 pl-6 pr-2 rounded overflow-y-auto overflow-x-auto shadow-md`}>
                <div className={` font-green ${Toast_CLASSES[color].iconColor} flex items-center`}>
                    { Toast_CLASSES[color].icon}
                </div>
                <div className={` px-3 border-r-2 ${Toast_CLASSES[color].border} `}>
                    <h1 className="text-base text-gray-900 font-semibold">{title}</h1>
                    <p className="text-sm text-gray-700 tracking-wide">{body} </p>
                </div> 
                <div className=" flex items-center text-gray-500 hover:text-black" onClick={()=>{ removeToast(id as string)}}>
                    <Close style={{ fontSize:"20px",marginLeft:"5px"}}/>
                </div>
            </div>
    )
}