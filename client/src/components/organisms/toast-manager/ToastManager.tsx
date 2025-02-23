import { useContext } from "react";
import Toast from "../../atoms/toast/Toast";
import { ToastContext } from "../../../context/toast-context";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../../App.css";

export default function ToastManager(){
    
    const { toasts} = useContext(ToastContext);

    return(
        <div className="fixed bottom-2 left-6 z-40 lg:w-auto" >
            <TransitionGroup>
            {
                toasts?.map((toast)=>{
                    return (
                    <CSSTransition
                        key={toast.id}
                        timeout={200}
                        classNames="toast-class"
                        unmountOnExit
                        children={<Toast {...toast}/>} 
                    />
                    )
                })
            }
            </TransitionGroup>
        </div>
    )
}