import { KeyboardEvent, useContext, useEffect, useState } from "react";
import TextField from "../../components/atoms/text-field/TextField.tsx";
import validator, { escape } from "validator";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../utils/config.tsx";
import axios from "axios";
import { ToastContext } from "../../context/toast-context.tsx";
import { useSelector } from "react-redux";
import { UserStateType } from "../../vite-env";

export default function Register(){

    const navigate = useNavigate();

    const { addToast, error} = useContext( ToastContext);

    const [ email, setEmail] = useState<string>("");
    const [ emailErrors, setEmailErrors] = useState<Array<string>>([]);
    const [ password1, setPassword1] = useState<string>("");
    const [ password1Errors, setPassword1Errors] = useState<Array<string>>([]);
    const [ password2, setPassword2] = useState<string>("");
    const [ password2Errors, setPassword2Errors] = useState<Array<string>>([]);
    const [ isLoading, setIsLoading] = useState<boolean>(false);
    const { isAuthenticated} = useSelector((state:{ user:UserStateType})=>state.user);

    const inputValidator = ():boolean =>{

        setEmailErrors([]);
        setPassword1Errors([]);
        setPassword2Errors([]);

        let isValid = true; 
    
        if(!validator.isEmail(email)){
            isValid = false;
            setEmailErrors(["must enter a valid Email"]);
        }

        if( password1.trim()===""){
            isValid = false;
            setPassword1Errors( ( prev)=> [ ...prev, "Password field should not be empty"]);
        }

        if( password2.trim()===""){
            isValid = false;
            setPassword2Errors( ( prev)=> [ ...prev, "Confirm Password field should not be empty"]);
        }

        if(! (/\d/.test(password1) )){
            isValid = false;
            setPassword1Errors( ( prev)=> [ ...prev, "password must contain at least 1 number"]);
        }

        if(password1.length <8 || password1.length > 25){
            isValid = false;
            setPassword1Errors( ( prev)=> [ ...prev, "Password must be between 8 to 25 characters"]);
        }

        if(password1!==password2){
            isValid = false;
            setPassword2Errors( ( prev)=> [ ...prev, "Passwords do not match"]);
        }

        return isValid;
    }

    const handleInputEmail = (value:string)=>{
        setEmailErrors([]);
        setEmail(value);
    }

    const handleInputPassword1 = (value:string)=>{
        setPassword1Errors([]);
        setPassword1(value);
    }

    const handleInputPassword2 = (value:string)=>{
        setPassword2Errors([]);
        setPassword2(value);
    }

    const handleKeyDown = (e:KeyboardEvent<HTMLDivElement>)=>{

        if(e.code === "Enter"){
            handleRegister();
        }
        
    }

    const handleRegister = async()=>{

        if(!inputValidator()){
            return;
        }

        try{
            setIsLoading(true);
            const { data} = await axios.post(`${server}/user/create`, { email, password1, password2}, { headers:{ "Content-Type":"application/json"}});
            setIsLoading(false);
            
            addToast( { title: `Successfully registered ${email}!` , body:"Please check your inbox to verify your email address" , color:"success" });
    
            navigate("/login");

        }
        catch(err:any ){
            setIsLoading(false);

            if("AxiosError"===err.name){

                if(err.message==="Network Error"){
                    error("Network Error");
                }

                const errors = err?.response?.data?.errors ;
                const emailFieldErrors = errors
                                      .filter((error:any)=>error.path==="email")
                                      .map((error:any)=>error.msg);
                const password1FieldErrors = errors
                                          .filter((error:any)=>error.path==="password1")
                                          .map((error:any)=>error.msg);
                const password2FieldErrors = errors
                                          .filter((error:any)=>error.path==="password2")
                                          .map((error:any)=>error.msg);
                            
                                          
                if(emailFieldErrors){ setEmailErrors(emailFieldErrors)};
                if(password1FieldErrors.length>0){ setPassword1Errors(password1FieldErrors)};
                if(password2FieldErrors.length>0){ setPassword2Errors(password2FieldErrors)};

                if( emailFieldErrors.length===0 && password1FieldErrors.length===0 && password2FieldErrors.length===0){
                    error("An Unknown error has occured, Please Try Again");
                }

            }
            else{
                error("An Unknown error has occured, Please Try Again");
            }
            
        }
    }


    useEffect(()=>{
    
        if(isAuthenticated){
            navigate("/document/all/create/");
        }

    },[ isAuthenticated]);

    return(
        <div  
          onKeyDown={handleKeyDown}
          className="w-screen h-[100vh] lg:h-[100vw] flex flex-col justify-start items-center bg-gray-100"
          >
            <div className="w-5/6 sm:w-[480px] mt-20 bg-white shadow-md rounded p-4">
                <p className="text-center">Logo</p>
                <div className="px-5">
                    <h1 className="text-center text-3xl font-semibold tracking-tighter">Sign Up</h1>
                    <p className="text-center font-medium">to continue to Docs</p>
                    <div className=" flex flex-col items-start mt-2">
                        
                        <TextField
                        value={email}
                        label={"Email"}
                        placeholder={"Enter Your Email"}
                        type={"text"}
                        onInput={handleInputEmail}
                        errors={emailErrors}
                        />

                        <TextField
                        value={password1}
                        label={"Password"}
                        placeholder={""}
                        type={"password"}
                        onInput={ handleInputPassword1}
                        errors={password1Errors}
                        />

                        <TextField
                        value={password2}
                        label={"Confirm Passwssord"}
                        placeholder={""}
                        type={"password"}
                        onInput={handleInputPassword2}
                        errors={password2Errors}
                        />



                        <Link to="/login" className="text-sm font-semibold text-blue-400 hover:underline m-2">
                            Sign in
                        </Link>

                        <button 
                            onClick={handleRegister}
                            className={`${isLoading ? "bg-gray-500" : "bg-blue-700"} hover:bg-blue-900  transition duration-300 text-white rounded w-full py-1 tracking-wide shadow-lg mt-4`}
                            disabled={isLoading}
                        >
                            <span className={`${isLoading && "opacity-0"}`}>Register</span>   
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
    )
}