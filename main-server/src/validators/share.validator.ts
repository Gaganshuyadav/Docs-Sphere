import { body} from "express-validator";
import PermissionEnum from "../utils/types/enum/permission-enum.js";


class ShareValidator{

    public createSharedDocument = [

        body("email")
            .normalizeEmail()                   //This function will normalize the email address (e.g., converting it to lowercase, removing dots in Gmail addresses, etc.).
            .isEmail()                                       
            .withMessage("Must provide a valid email to share this document with."),
            
        body("permission")
            .custom( ( value:PermissionEnum)=>{

                if(!Object.values(PermissionEnum).includes(value ) ){

                    throw new Error("Must provide a valid document permission.");
                }

                return true;
            }),

    ]

}

export default new ShareValidator();