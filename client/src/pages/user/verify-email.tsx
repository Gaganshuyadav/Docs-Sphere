import { useContext, useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router";
import { server } from "../../utils/config";
import axios from "axios";
import { ToastContext } from "../../context/toast-context";

export default function VerifyEmail(){

    const [ children, setChildren] = useState<JSX.Element>();
    const { token} = useParams();

    const { addToast, error} = useContext( ToastContext);

    
    useEffect(()=>{
        
        if(!token){
            setChildren(<Navigate to="/login" />);
        }
        else{

            async function verifyEmailAPI(){
                try{
                    await axios.put(`${server}/user/verify-email/${token}`, { headers:{ "Content-Type":"application/json"}});
    
                    addToast( { title: "Successfully verified your email address", body: "You may now login" ,color:"success" })
                    setChildren( <Navigate to="/login" />)
                }
                catch(err:any){
    
                    if(err.name==="AxiosError"){
                        
                        error("An unknown error has occurred. please try again");
                    }    
                    else{
                        
                        error("An unknown error has occurred. please try again");
                    }

                    setChildren( <Navigate to="/login" />);
                }
                
            }
            
            verifyEmailAPI();
            
        }


    },[]);


    return children;
}