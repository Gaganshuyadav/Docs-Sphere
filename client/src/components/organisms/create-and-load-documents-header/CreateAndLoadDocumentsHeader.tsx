import DocumentSearchBar from "../../atoms/Create-And-Load-Documents/document-searchbar/DocumentSearchBar";
import Logo from "../../atoms/logo/Logo";
import UserDropdown from "../../atoms/user-dropdown/UserLogoutDropdown";

export default function CreateAndLoadDocumentsHeader(){

    return(
        <div className=" flex h-20 justify-between items-center">
            <Logo width={40} marginLeft={4}/>
            <DocumentSearchBar/>
            <UserDropdown/>
        </div>
    )
}