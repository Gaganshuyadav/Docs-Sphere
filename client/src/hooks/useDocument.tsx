import { server } from "../utils/config";
import useLocalStorage from "./useLocalStorage";
import axios from "axios";
import { setDocument} from "../redux/Slices/documentSlice";
import { useDispatch } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { DocumentInterface } from "../types/interfaces/Document";
import { useNavigate, useParams } from "react-router";
import { ToastContext } from "../context/toast-context";

export default function useDocument(){

    const [ accessToken] = useLocalStorage("docs-sphere-refresh-token","");
    const [ loading, setLoading] = useState<boolean>(false);
    const params = useParams();
    const { error} = useContext(ToastContext); 
    const [ errors, setErrors] = useState<Array<string>>([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();



    const loadOneDocumentWithSpecificId = async ( documentId:string)=>{

        //if id is not a number, to safe the seqelizer error
        if(!Number(params.id)){
            navigate("/document/all/create");
            return;
        }

        setLoading(true);

        try{
            const { data} = await axios.get<{ success:true, document: DocumentInterface}>(`${server}/document/${documentId}`, { headers:{ "Content-Type":"application/json", "Authorization":`Bearer ${accessToken}` } });
            dispatch( setDocument(data.document));
        }
        catch(err:any ){

            if(err?.status===404){
                setErrors((prev)=>[ ...prev, "Document does not Exist"]);
                
            }
            else{
                setErrors((prev)=>[ ...prev, "An unknown error has occurred, Please try again"])
            }

            setLoading(false);
            navigate("/document/all/create");
        }
        finally{
            setLoading(false);
            
        }

    }

    useEffect(()=>{
        if(accessToken==null) return; //we dont need this , cause Auth Provide , authenticate it
        loadOneDocumentWithSpecificId(params.id as string);
    },[]);

    useEffect(()=>{

        if(errors.length > 0){
            errors.forEach((err)=>{
                error(err);
            })
        }
    },[errors]);

    return [ errors, loading];


} 