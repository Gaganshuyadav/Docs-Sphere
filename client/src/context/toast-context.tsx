import { createContext, useState} from "react";
import { ActionInterface, ToastInterface } from "../types/interfaces/Toast.tsx";
import { v4 as uuid } from "uuid";
import ToastManager from "../components/organisms/toast-manager/ToastManager.tsx";

interface ToastContext {
    children: JSX.Element;
}

interface ToastContextInterface{
    toasts: Array<ToastInterface>;
    addToast: ( 
        { 
            id, 
            color, 
            title, 
            body, 
            actions
        }:{ 
            id?: string, 
            color?: ToastInterface["color"];
            title?: string, 
            body?: string, 
            actions?: Array<ActionInterface>
        },
        duration?:number
    )=>void;
    removeToast: ( id:string)=>void;
    error: ( title:string)=>void;
    success: ( title:string)=>void;
    info: ( title:string)=>void;
}

const defaultValue:ToastContextInterface = {
    toasts: [],
    addToast: ()=>{},
    removeToast : ()=>{},
    error: ()=>{},
    success: ()=>{},
    info: ()=>{}
}

export const ToastContext = createContext<ToastContextInterface>(defaultValue);


export const ToastProvider = ( { children}:ToastContext)=>{


    const [ toasts, setToasts] = useState<Array<ToastInterface>>([]);


    let Default_duration = 5000; 

    const addToast = ( { id=uuid(), color="primary", title, body, actions}:ToastInterface, duration?:number) =>{
        setToasts( (prev)=>[ ...prev, {id, color, title, body, actions} ] );

        if(duration){ 
            Default_duration = duration; 
        };

        setTimeout(()=>{
            removeToast(id);
        }, Default_duration );
        
    }

    const removeToast = ( id:string)=>{
        setToasts((prev)=>prev.filter((toast)=>toast.id!==id));
    }

    const success = (title:string)=>{
        addToast({ color: "success", title});
    }
    
    const error = ( title:string)=>{
        addToast({ color: "danger", title});
    }

    const info = ( title:string)=>{
        addToast({ color: "warning", title});
    }



    return (
    <ToastContext.Provider 
        value={{ toasts, addToast, removeToast, success, error, info}}
    >
        {children}
        <ToastManager/>
    </ToastContext.Provider>)
}

