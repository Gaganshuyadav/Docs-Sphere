import { DocumentInterface } from "../../../types/interfaces/Document";
import DocumentCard from "../../atoms/Create-And-Load-Documents/document-card/DocumentCard";


interface DocumentListProps {
    title: string,
    documents: Array<DocumentInterface>,
    setDocuments: Function
}

export default function DocumentsList({ title, documents, setDocuments}:DocumentListProps){
    
    return(
        <div className="px-5 py-4">
            <div>
                <h1 className=" pb-3 font-semibold text-gray-700">{title}</h1>
                <div className="w-full flex ">
                    {
                        documents?.map((document,i)=>{
                            return (<DocumentCard key={i} document={document && document} setDocuments={setDocuments} />)
                        })
                    }
                </div>
            </div>
        </div>
    )
}