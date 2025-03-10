import { Visibility, VisibilityOff, ErrorOutline} from "@mui/icons-material";
import InputProps from "../../../types/interfaces/InputProps";
import { ChangeEvent, useEffect, useRef, useState} from "react";
import Errors from "../errors/Errors.tsx";

interface TextFieldProps extends InputProps{
    value?: string|number;
    onInput?: (value:string)=>void;
    type?: "text" | "password" | "textarea";
    mask?: string;
    icon?: JSX.Element;
    label?: string
    placeholder?: string;
    errors?: Array<string>
}


const TextField = ( { 
    value , 
    onInput = ()=>{}, 
    type="text", 
    mask, 
    icon, 
    label, 
    placeholder, 
    errors=[]
}:TextFieldProps) => {


    const textFieldRef = useRef<any>(null);
    const [ showPassword, setShowPassword] = useState<boolean>(false);
    const [ isFocused, setIsFocused] = useState<boolean>(false);

    // useEffect(()=>{
    //     if(textFieldRef && textFieldRef.current && mask){
    //         const inputMask = new InputMask(mask);
    //         inputMask.mask(textFieldRef.current);
    //     }
    // },[]);
    
    return (
        <div className="w-full text-sm py-1 relative ">
            <label className="font-semibold text-[16px] relative">{label}</label>
            <div className={`w-full ${ errors.length > 0 ? "ring-1 ring-red-400" : (isFocused ? "ring-1 ring-blue-500" : "ring-1 ring-gray-400") } rounded bg-gray-100 mt-1 flex items-center justify-center relative`} >
                
                <div className="text-gray-500 px-2">
                     {icon}
                </div>
                {
                    type!=="textarea" ?
                    (<div className="w-full relative ">
                        <input 
                            className=" w-full rounded p-3 bg-gray-100 relative outline-none" 
                            ref={textFieldRef}
                            type={ type!=="password" ? type : ( showPassword ? "text" : "password") }
                            onChange={(e:ChangeEvent<HTMLInputElement>)=>{ onInput(e.target.value as string); }}
                            onFocus={()=>setIsFocused(true)}
                            onBlur={()=>setIsFocused(false)}
                            value={value}
                            placeholder={placeholder && placeholder}
                        />
    
                        { type==="password" && ( 
                            <button onClick={()=>{ setShowPassword(!showPassword)}} className="absolute top-2 right-3 text-gray-600 ">
                                { showPassword ? (<VisibilityOff style={{fontSize:"27px"}} />) : (<Visibility style={{fontSize:"27px"}} /> ) }
                            </button>
                        )}
                    </div>)
                    : 
                    (<div className="w-full">
                        <textarea
                        ref={textFieldRef}
                        className="w-full p-2"
                        onChange={(e:ChangeEvent<HTMLTextAreaElement>)=>{ onInput(e.target.value as string) }}
                        onFocus={()=>{ setIsFocused(true)}}
                        onBlur={()=>{ setIsFocused(false)}}
                        value={value}
                        placeholder={placeholder}
                        />
                    </div>)
                }

                { 
                    errors.length > 0 
                    ? 
                    (
                        <div className="">
                            <ErrorOutline className="text-red-500 w-4 h-4" style={{fontSize:"28px"}}/>
                        </div>
                    )
                    :
                    null
                } 
            </div>
            <Errors errors={errors}/>
        </div>
    )
}


export default TextField;










