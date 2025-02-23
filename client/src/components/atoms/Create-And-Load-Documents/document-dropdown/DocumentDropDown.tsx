import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useContext, useEffect, useRef, useState } from 'react';
import useLocalStorage from '../../../../hooks/useLocalStorage';
import { server } from '../../../../utils/config';
import axios from "axios";
import { DocumentInterface } from '../../../../types/interfaces/Document';
import { ToastContext } from '../../../../context/toast-context';
import Loader from '../../loader/Loader';

interface DocumentDropDownInterface{
    document: DocumentInterface,
    setDocuments: Function
}

export default function DocumentDropDown( { document, setDocuments}: DocumentDropDownInterface){

    const [ isDropDown, setIsDropDown] = useState<boolean>(false);
    const documentDropDownButtonRef = useRef<HTMLDivElement>(null);
    const documentDropDownMenuRef = useRef<HTMLDivElement>(null);
    const [ accessToken] = useLocalStorage("docs-sphere-refresh-token","");
    const { error} = useContext(ToastContext);
    const [ loading, setLoading] = useState(false);

    //drop down control
    useEffect(()=>{

        const handleDocumentDropDownButtonClick =  (e:MouseEvent)=>{
            
            if(documentDropDownButtonRef.current?.contains(e.target as HTMLElement) && documentDropDownMenuRef.current?.contains(e.target as HTMLDListElement)){
                setIsDropDown(false);
            }
            else if(documentDropDownButtonRef.current?.contains(e.target as HTMLDivElement)){
                setIsDropDown((prev)=>(!prev));
            }
            else{
                setIsDropDown(false);
            }
            
        };

        window.addEventListener("click", handleDocumentDropDownButtonClick);
        
        return ()=>{
            window.removeEventListener("click", handleDocumentDropDownButtonClick);
        }
    },[]);



    //delete document Event
    const handleDeleteDocument = async ( documentId:number)=>{

        setLoading(true);

        try{
            await axios.delete(`${server}/document/${documentId}`, { headers:{ "Content-Type":"application/json", "Authorization":`Bearer ${accessToken}` } });

            //delete document from frontend after deletion in backend
            setDocuments((prev:Array<DocumentInterface>)=>{ return prev.filter((document)=>document.id!==documentId)});
            setLoading(false);
        }
        catch(err:any){
            error("Failed to delete document, Please try again");
            setLoading(false);
        }
    };
    


    return(
        <div ref={documentDropDownButtonRef} className='rounded-full relative z-40'>
          
               <div>
                   <MoreVertIcon style={{color:"gray"}}/>
               </div>
                
                { loading && <Loader/>}
        
                <TransitionGroup>
                    {
                        isDropDown && (
                        <CSSTransition
                            timeout={200}
                            classNames="toast-class"
                            unmountOnExit
                            children={ 
                                (<div ref={ documentDropDownMenuRef} className={`${ isDropDown ? "block" : "none"} absolute border-2 border-gray-300 rounded bg-white top-7 right-[-10px] py-1 font-semibold text-gray-700`}>
                                    <div 
                                        onClick={()=>{handleDeleteDocument(document?.id)}} 
                                        className=' px-5 hover:bg-gray-200'
                                    >
                                        <button>Delete</button>
                                    </div>
                                </div>)
                            }
                        />)
                    }
                </TransitionGroup>
            </div>
    )
}





