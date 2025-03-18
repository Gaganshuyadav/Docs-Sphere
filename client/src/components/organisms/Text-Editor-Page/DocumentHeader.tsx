import DocumentMenuBar from "../../molecules/Text-Editor-Page/document-menu-bar/DocumentMenuBar";
import EditorToolbar from "../../molecules/Text-Editor-Page/editor-toolbar/EditorToolbar";


const DocumentHeader = ()=>{

    return(
        <div className="w-full border-2 border-gray-200 flex flex-col">
            <DocumentMenuBar/>
            <EditorToolbar/>
        </div>
    )
}

export { DocumentHeader};