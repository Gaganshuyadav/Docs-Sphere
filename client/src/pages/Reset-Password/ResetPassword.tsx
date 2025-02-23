import React, { KeyboardEvent, useContext, useEffect, useState } from 'react'
import { server } from '../../utils/config';
import axios from "axios";
import { useNavigate, useParams } from 'react-router';
import Logo from '../../components/atoms/logo/Logo';
import TextField from '../../components/atoms/text-field/TextField';
import { ToastContext } from '../../context/toast-context';
import { useSelector } from 'react-redux';
import { UserStateType } from '../../vite-env';

const ResetPassword = () => {

    const params = useParams();
    const [ newPassword, setNewPassword] = useState<string>("");
    const [ confirmPassword, setConfirmPassword] = useState<string>(""); 
    const [ isLoading, setIsLoading] = useState<boolean>(false);
    const  { error} = useContext(ToastContext);
    const navigate = useNavigate();
    const { isAuthenticated} = useSelector((state:{ user:UserStateType})=>state.user);



    const handleResetPasswordBtn = async ()=>{

        if(newPassword.trim()==="" || confirmPassword.trim()===""){
            error("Field is Empty");
            return;
        }

        if(newPassword.length < 8){
            error("Password length should be greater than 7");
            return;
        }

        if(newPassword!==confirmPassword){
            error("new password and confirm password does not match");
            return;
        }

        setIsLoading(true);
        try{
            await axios.put(`${server}/user/password/${params.resetPasswordToken}`, { password1: newPassword, password2: confirmPassword}, { headers:{ "Content-Type":"application/json"}});
            setIsLoading(false);
            navigate("/login");
        }
        catch(err:any ){
            setIsLoading(false);
            error("something went wrong");
            console.log(err)
        }

    };

    const handleKeyDown = (e:KeyboardEvent)=>{

        if(e.code==="Enter"){
            handleResetPasswordBtn();
        }
    
    };



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
                        value={newPassword}
                        label={"New Password"}
                        placeholder={"New Password"}
                        type={"password"}
                        onInput={(e)=>{setNewPassword(e)}}
                        />

                        <TextField
                        value={confirmPassword}
                        label={"Confirm Password"}
                        placeholder={"Confirm Password"}
                        type={"password"}
                        onInput={(e)=>{setConfirmPassword(e)}}
                        />

                        <button 
                            onClick={handleResetPasswordBtn}
                            className={`${isLoading ? "bg-gray-500" : "bg-blue-700"} hover:bg-blue-900  transition duration-300 text-white rounded w-full py-1 tracking-wide shadow-lg mt-4`}
                            disabled={isLoading}
                        >
                         <span className={`${isLoading && "opacity-0"}`}>Change Password</span> 
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

export default ResetPassword;