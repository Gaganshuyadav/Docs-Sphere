import { useSelector} from "react-redux";
import { UserStateType } from "../../vite-env";
import CreateAndLoadDocumentsHeader from "../../components/organisms/create-and-load-documents-header/CreateAndLoadDocumentsHeader";
import CreateDocumentButton from "../../components/atoms/Create-And-Load-Documents/create-document-button/CreateDocumentButton";
import DocumentsList from "../../components/molecules/documents-list/DocumentsList";
import { useDocuments } from "../../hooks/useDocuments";
import { DocumentInterface } from "../../types/interfaces/Document";


export default function CreateAndLoadDocuments(){

    const [ documents, setDocuments] = useDocuments() as [ Array<DocumentInterface>, Function, Array<string> , boolean];

    const { user} = useSelector((state:{user:UserStateType})=>state.user);

    const userDocuments:Array<DocumentInterface> = documents?.filter((document)=>document?.userId === user?.id);

    const sharedDocuments:Array<DocumentInterface> = documents?.filter((document)=>document?.userId !== user?.id);

    
    
    return(
        <div>
              <CreateAndLoadDocumentsHeader/>
              <CreateDocumentButton/>
              <DocumentsList title={"Previous Documents"}  documents={userDocuments} setDocuments={setDocuments} />
              <DocumentsList title={"Shared Documents"} documents={sharedDocuments} setDocuments={setDocuments} />
        
        </div>
    )
}