import { useSelector } from "react-redux";
import { DocumentInterface } from "../../../../types/interfaces/Document";
import DocumentDropDown from "../document-dropdown/DocumentDropDown";
import Logo from "../../logo/Logo";
import { UserStateType } from "../../../../vite-env";
import { Link } from "react-router";
import { memo } from "react";


interface DocumentCardProps {
    document: DocumentInterface,
    setDocuments: Function
}

export default memo(function DocumentCard( { document, setDocuments}:DocumentCardProps){

    const { user} = useSelector( (state:{ user:UserStateType})=>state.user);



    const Skeleton = (
        <div className="ml-1">
            {
                Array.from({ length:16}, ( x,y)=>{

                    return(
                        <div key={y} className="m-2">
                          <div style={{ width:`${Math.floor(Math.random()*100)}%`, height:"5px", borderRadius:"3px", backgroundColor:"gray", opacity:"0.2"}}>
                          </div>
                        </div>
                    )
                })
            }
        </div>
    ) 

    return(
        <div>
          <div className="w-48 border-2 border-gray-200 rounded-md mr-4 hover:ring-1 hover:ring-blue-400">
            <Link to={`/document/${document.id}`}>
            
            <div className="border-1 border-gray- pt-1">
                { Skeleton}
            </div>
            
            </Link>

            <div className="border-t-2 box-border px-2 py-3">
                <div>
                    <h1 className="font-semibold text-gray-700 ml-[3px]">{document?.title}</h1>
                </div>

                <div className="flex justify-between">

                    <Link to={`/document/${document.id}`}>
                    <div className="flex justify-start items-end">
                        <div>
                            <Logo width={25} marginLeft={0}/>
                        </div>
                        <div className="font-semibold text-gray-400 text-xs">
                            {new Date( document?.updatedAt).toLocaleDateString("en-US",{ month: "short", day:"numeric", year:"numeric"})}
                        </div>
                        
                    

                    </div>
                    </Link>

                    {
                        document?.userId=== user?.id && (
                            <div className="text-gray-600 rounded-full hover:bg-gray-200">
                               <DocumentDropDown document={document} setDocuments={setDocuments} />
                            </div> 
                        )
                    }

                    
                </div>

            </div>
           
          </div>
        </div>
        
    )
})