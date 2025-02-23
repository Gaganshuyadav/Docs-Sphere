import {  EventHandler, useContext, useEffect, useRef, useState, memo } from "react";
import { useRandomColor} from "../../../hooks/useRandomColor";
import { useDispatch, useSelector } from "react-redux";
import { UserStateType } from "../../../vite-env";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "../../../App.css"
import useLocalStorage from "../../../hooks/useLocalStorage";
import { destroyAuth, setIsUserLoading } from "../../../redux/Slices/userSlice";
import { Token } from "../../../types/interfaces/Token";
import { server } from "../../../utils/config";
import axios from "axios";
import { ToastContext } from "../../../context/toast-context";
import { useNavigate } from "react-router";
import randomColor from "randomcolor";


const UserDropdown = ()=>{

    const dispatch = useDispatch();
    const color = randomColor();
    const navigate = useNavigate();
    const [ value, setValue] = useLocalStorage( "docs-sphere-refresh-token", "");
    const { success, error} = useContext( ToastContext);
    const { user} = useSelector( (state:{ user:UserStateType})=>state.user);
    const [ isDropdown, setDropDown] = useState<boolean>(false);
    const dropDownButtonRef = useRef<HTMLButtonElement>(null);
    const dropDownContentRef = useRef<HTMLDivElement>(null);

    useEffect(()=>{

        const handleUserIconClickEventListener = (e:MouseEvent)=>{
    
            if(dropDownContentRef.current?.contains(e.target as HTMLElement) && dropDownButtonRef.current?.contains(e.target as HTMLElement)){
                setDropDown(false);
            }
            else if(dropDownContentRef.current?.contains(e.target as HTMLElement)){
                setDropDown((prev)=>!prev);
            }
            else{
                setDropDown(false);
            }
        }

            window.addEventListener("click", handleUserIconClickEventListener);

    return ()=>{
        window.removeEventListener("click", handleUserIconClickEventListener);
    }
            
    },[]);

    const handleUserLogout = async ( ) =>{

        if(value==null){
            return;
        }

        dispatch(setIsUserLoading(true));

        try{
            await axios.delete(`${server}/auth/logout`, {  headers:{ "Content-Type":"application/json", "Authorization":`Bearer ${value}`}});
            dispatch( destroyAuth());
            setValue(null);
            success("Successfully logged out!");
            navigate("/login");
        }
        catch(err){
            error("Invalid Request");
        }
    }
    
    
    
    return(
        <div ref={dropDownContentRef} className=" mr-4 shadow-xl rounded-full relative cursor-pointer">
            <div style={{backgroundColor:color}} className={`w-12 h-12 rounded-full relative`}
            >
                <h1 className=" text-3xl text-center h-full text-white mt-[2px] pt-1 rounded-fill">
                    { user?.email.charAt(0).toUpperCase()}
                </h1>
                
            </div>
           
           {/* dropdown content */}
           <TransitionGroup>
            {
                isDropdown && (

           <CSSTransition
                        timeout={200}
                        classNames="toast-class"
                        unmountOnExit
                        children={ 
                            (<div className={`border-2 border-gray-300 bg-white absolute right-0 rounded top-12 ${isDropdown ? "block" : "hidden"}`}>
                                <div className="my-1">
                                  <button onClick={handleUserLogout} ref={ dropDownButtonRef} className="px-4 py-1 text-gray-700 font-semibold hover:bg-gray-200">Logout</button>
                                </div>
                            </div>)
                        }
            />)
            
            }
            </TransitionGroup>
        
        </div>
    )
}

export default memo(UserDropdown);
