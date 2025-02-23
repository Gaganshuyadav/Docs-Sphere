import axios from "axios";
import { server } from "../../../../utils/config";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import { DocumentInterface } from "../../../../types/interfaces/Document";
import { useNavigate } from "react-router";
import AddIcon from '@mui/icons-material/Add';
import Loader from "../../loader/Loader";
import { useState } from "react";


export default function CreateDocumentButton(){

    const [ accessToken, setToken] = useLocalStorage("docs-sphere-refresh-token", "");
    const [ loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleCreateNewDocument = async()=>{

        setLoading(true);
        try{
            const { data} = await axios.post<{ success:true, document: DocumentInterface}>(`${server}/document/`, {}, { headers:{ "Content-Type":"application/json", "Authorization":`Bearer ${accessToken}` } });
            navigate(`/document/${data.document.id}`);
            setLoading(false);
        }
        catch(err:any ){
            setLoading(false);
            console.log(err);
        }
    
    }

    return(
        <div className="w-full bg-gray-200 px-5 py-8">
            { loading && <Loader/>}
            <div>
                <h1 className="font-semibold text-gray-700 py-2">Start a new document</h1>
                <div>
                    <button onClick={handleCreateNewDocument} className="h-52 w-40 bg-white shadow-md hover:bg-gray-50 hover:ring-2 hover:ring-blue-500">
                        <AddIcon sx={{ fontSize:"70px", color:"red", borderRadius:"50%"}}/>
                    </button>
                    <h1 className="font-semibold text-gray-700 py-1">Blank</h1>
                </div>
            </div>
        </div>
    )
}