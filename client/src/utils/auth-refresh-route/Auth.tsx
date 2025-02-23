import { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { UserStateType } from "../../vite-env";
import { AppDispatch } from "../../redux/store";
import { Token } from "../../types/interfaces/Token";
import { server } from "../config";
import { destroyAuth, setIsUserLoading, setLoginAuth } from "../../redux/Slices/userSlice";
import { UserType } from "../../types/interfaces/UserType";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router";
import axios from "axios";
import Loader from "../../components/atoms/loader/Loader";



function Auth( { children}:{ children:JSX.Element}){

    const [ storedValue, setValue] = useLocalStorage("docs-sphere-refresh-token", "");
    const { isUserLoading, isAuthenticated} = useSelector((state:{user: UserStateType})=>state.user);
    const [ firstRender, setFirstRender] = useState(false); 
    const dispatch = useDispatch<AppDispatch>();

    const authenticateWithRefreshToken = async ({token}:{token:string|null})=>{

        if(token===null){
            dispatch(destroyAuth());
            return;
        }

        try{
            const { data} = await axios.post<Token>(`${server}/auth/refresh-token`, { token}, {  headers:{ "Content-Type":"application/json"}});
            dispatch( setLoginAuth(data));
            setValue(data.authResponse.refreshToken);
            
            const decodedData:UserType = jwtDecode(data.authResponse.accessToken);

            // setTimeout for expiration of accessToken and refresh data
             const msExpiration = Math.abs( new Date().getTime() - new Date( (decodedData?.exp)*1000 ).getTime() )     // Multiply by 1000 to convert seconds to milliseconds
           
             //after expiration of access Token , user logout automatically
             setTimeout(()=>{
                dispatch( destroyAuth());
             }, msExpiration);
        }
        catch(err:any ){
            console.log(err);
            dispatch( destroyAuth());
        }

    }


    useEffect(()=>{
        dispatch(setIsUserLoading(true));
        authenticateWithRefreshToken({token:storedValue});
    },[]);


    //to stop Navigate in first time render of page( useeffects calls after rendering the page), and start loading
    useEffect(()=>{
        setFirstRender(true);
    },[]);



    if(isUserLoading || !firstRender){
        return <Loader/>
    }
    else{

        if(isAuthenticated===true){
            return <div>{children}</div>
        }

        if(isAuthenticated===false){
            return <Navigate to="/login"/>
        }

        return <Loader/>
    }

    
}

export { Auth};