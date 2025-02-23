import { useDispatch, useSelector } from "react-redux";
import { useRandomColor } from "../../../../hooks/useRandomColor";
import { DocumentInterface } from "../../../../types/interfaces/Document";
import { DocumentStateType, UserStateType } from "../../../../vite-env";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import axios from "axios";
import { server } from "../../../../utils/config";
import { useContext, useState } from "react";
import { AppDispatch } from "../../../../redux/store";
import { savingDocument, setDocument } from "../../../../redux/Slices/documentSlice";
import { ToastContext } from "../../../../context/toast-context";


export default function SharedUsers({ document }: { document?: DocumentInterface }) {

    const [randomColor, colors] = useRandomColor();
    const dispatch = useDispatch<AppDispatch>();
    const { user} = useSelector( (state:{ user: UserStateType})=>( state.user));
    const [ accessToken] = useLocalStorage( "docs-sphere-refresh-token", "");
    const [ isLoading, setIsLoading] = useState(false);
    const { error} = useContext( ToastContext);


    const removeUserFromTheSharedList = async ( removeId:number) =>{

        
        
        dispatch( savingDocument(true))
        setIsLoading(true);

            try{
                await axios.delete(`${server}/document/${document?.id}/share/${removeId}`, { headers:{ "Content-Type":"application/json", "Authorization":`Bearer ${accessToken}` } });
                removeUserFromTheDocumentInFrontend(removeId);
                
            }
            catch(err:any ){
                console.log(err);
                error("Removing Failed, Please try again !!");
            } 
            finally{
                setIsLoading(false);
                dispatch( savingDocument(false));
            }
    
    }

    const removeUserFromTheDocumentInFrontend = ( rId:number)=>{

        const findSharedUsersExceptRemovedUser = document?.sharedDocuments.filter((sharedUser)=>{
            return sharedUser.userId !== rId;
        })

        dispatch( setDocument({ ...document, sharedDocuments: findSharedUsersExceptRemovedUser}));
    };


    return (
        <>
            <div className=" flex flex-col ">

                <div className="flex items-center justify-between mb-1">
                    <div className="flex">
                        <div className={`w-9 h-9 rounded-full ${randomColor} m-2`}>
                            <h1 className=" text-2xl text-center h-full rounded-fill text-white" >
                                {user?.email.charAt(0).toUpperCase()}
                            </h1>
                        </div>
                        <div className="my-auto text-lg text-gray-700 font-semibold" >
                            {user?.email}
                        </div>
                    </div>
                    <button className=" text-md italic text-gray-400 font-semibold mr-2" disabled={true}>Owner</button>
                </div>

                {
                    document?.sharedDocuments?.map((documentUser, i) => {

                        return (
                            <>
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex">
                                    <div className={`w-9 h-9 rounded-full ${colors[i]} m-2`}>
                                        <h1 className=" text-2xl text-center h-full rounded-fill text-white" >
                                            {documentUser?.User?.email.charAt(0).toUpperCase()}
                                        </h1>
                                    </div>
                                    <div className="my-auto text-lg text-gray-700 font-semibold" >
                                        {documentUser?.User?.email}
                                    </div>
                                </div>
                                <button 
                                    onClick={()=>{ removeUserFromTheSharedList(documentUser?.userId);}}
                                    className=" text-md text-blue-500 font-semibold mr-2 hover:text-white hover:bg-red-400 hover:rounded px-1 tracking-wide cursor-pointer" 
                                    disabled={isLoading}
                                >
                                    Remove
                                </button>
                            </div>
                            </>
                        )
                    })
                }

            </div>
        </>
    )
}