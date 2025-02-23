import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useLocalStorage from "./useLocalStorage";
import { UserStateType } from "../vite-env";
import { server } from "../utils/config";
import axios from "axios";
import { ToastContext } from "../context/toast-context";
import { DocumentInterface } from "../types/interfaces/Document";



const useDocuments = ()=>{

    const {  accessToken} = useSelector( ( state:{ user:UserStateType })=> state.user);
    const { error } = useContext( ToastContext);
    const [ Errors, setErrors] = useState<Array<string>>([]);
    const [ loadingDocuments, setLoadingDocuments] = useState<boolean>(false);
    const [ documents, setDocuments]:[ Array<DocumentInterface>, Function] = useState<Array<DocumentInterface>>([]);
    

    const loadDocuments = async ( accessToken:string)=>{

        if(!accessToken){
            return;
        }
        setLoadingDocuments(true);

        try{
            setLoadingDocuments(true);
            const { data} = await axios.get<{ success:true, documents: Array<DocumentInterface> } >(`${server}/document/`, { headers:{ "Content-Type":"application/json", Authorization:`Bearer ${accessToken}` },  });
            setDocuments(data.documents);
        }
        catch(err){
            console.log(err)
            error("Unable to load documents. Please try again.");
            setErrors(["Unable to load documents. Please try again."]);

        }
        finally{
            setLoadingDocuments(false);
        }

    }

    useEffect(()=>{
        if(accessToken===null) return;
        loadDocuments(accessToken);

    },[]);


    return [ documents, setDocuments, Errors, loadingDocuments];
    
}

export { useDocuments};