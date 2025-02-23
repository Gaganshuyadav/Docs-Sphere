import Loader from "../../components/atoms/loader/Loader";
import { DocumentEditor } from "../../components/organisms/Text-Editor-Page/DocumentEditor"
import { DocumentHeader } from "../../components/organisms/Text-Editor-Page/DocumentHeader"
import useDocument from "../../hooks/useDocument";

export default function TextEditorPage(){
    const [ errors, loading] = useDocument();

    return (
        <div className="border-2 w-full flex flex-col">
            { loading && <Loader/>}
            <DocumentHeader/>
            <DocumentEditor/>
        </div>
    )
}