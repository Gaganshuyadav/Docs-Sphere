import React, { KeyboardEvent, useContext, useEffect, useState } from 'react'
import Logo from '../../components/atoms/logo/Logo';
import TextField from "../../components/atoms/text-field/TextField";
import { server } from '../../utils/config';
import axios from "axios";
import { ToastContext } from '../../context/toast-context';
import { Link, useNavigate } from 'react-router';
import validator from "validator";
import { UserStateType } from '../../vite-env';
import { useSelector } from 'react-redux';

const EnterEmail = () => {

    const [ email, setEmail] = useState(""); 
    const navigate = useNavigate();
    const [ emailErrors, setEmailErrors] = useState<Array<string>>([]);
    const [ isLoading, setIsLoading] = useState(false);
    const { error, success} = useContext(ToastContext);
    const { isAuthenticated} = useSelector((state:{ user:UserStateType})=>state.user);

  
  const handleKeyDown = (e:KeyboardEvent)=>{
    
    if(e.code==="Enter"){
        handleSendResetMail();
    }
    
  }

 
  const validate = ()=>{
    
    let isValid = true;

    if(!validator.isEmail(email)){
        isValid = false;
        setEmailErrors(["Enter a valid Email"]);
    }

    return isValid;


  }
  
  const handleSendResetMail = async () =>{

    if(!validate){
        return;
    }

        setIsLoading(true);

        try{
            await axios.post(`${server}/user/reset-password`, { email}, { headers:{ "Content-Type":"application/json" }});
            setIsLoading(false);
            success("Email Send Successfully");
        }
        catch(err:any ){
            setIsLoading(false);
            if(err.status===404){
                error("Email does not exist");
            }
        }
    };


  const handleInputEmail = (value:string)=>{
    setEmailErrors([]);
     setEmail(value);

  }



    useEffect(()=>{
    
        if(isAuthenticated){
            navigate("/document/all/create/");
        }

    },[ isAuthenticated]);

  return (

    <>
        <div onKeyDown={handleKeyDown} className="w-screen  h-[100vh] lg:h-[100vw] flex flex-col justify-start items-center bg-gray-100">
            <div className="w-5/6 sm:w-[480px] mt-20 bg-white shadow-md rounded p-4">
                <div className="flex justify-center p-2">
                    <Logo marginLeft={0} width={40}/>
                </div>
                <div className="px-5 mt-6">
                    <div className="flex flex-col mt-2  w-full">
                        
                        <TextField 
                        value={email}
                        label={"Email"}
                        placeholder={"Email"}
                        type={"text"}
                        errors={emailErrors}
                        onInput={handleInputEmail}
                        />

                        <button 
                            onClick={handleSendResetMail}
                            className={`${isLoading ? "bg-gray-500" : "bg-blue-700"} hover:bg-blue-900  transition duration-300 text-white rounded w-full py-1 tracking-wide shadow-lg mt-4`}
                            disabled={isLoading}
                        >
                         <span className={`${isLoading && "opacity-0"}`}>Send Mail</span> 
                        </button>

                    </div>
                </div>
            </div>

            <div className="space-x-4 space-y-3">
                <button className="font-semibold text-blue-400 hover:underline">
                    Terms
                </button>
                <button className="font-semibold text-blue-400 hover:underline">
                    Privacy Policy
                </button>
            </div>
    
        </div>
        </>
  )
}

export default EnterEmail;