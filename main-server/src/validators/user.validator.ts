import { body} from "express-validator";
import { userService} from "../services/user.service.js";
import { User } from "../models/user.model.js";

class UserValidator{
    public register = [
        body("email").notEmpty().normalizeEmail().isEmail().withMessage("Must Provide valid email address"),
        body("email").custom( async ( val:string)=>{        
                                                                                                                                                                 //.custom() method is used to create custom validation logic.
            const user = await userService.findUserByEmail(val);
            
            if(user){
                return Promise.reject("User with email already exists");                                                                                         // Promise.reject() that returns a Promise object that is rejected with a given reason.( when you want to create a rejected promise to handle errors) 
            }
            return true;
        }),
        body("password1")
            .isLength({ min: 8, max: 25}) 
            .withMessage("Password must be between 8 to 25 characters")
        ,
        body("password1")
            .matches(/\d/)
            .withMessage("Password must contain atleast 1 number")
        ,
        body("password2")
            .custom( async ( value, { req})=>{
                

                if(value !== req.body.password1){
                    throw new Error("Passwords must match");
                }

                return true;
            })                                                                                                                       // .matches() method is used to validate that a string matches a specified regular expression pattern
                                                                                           
    ]

    public resetPassword = [
        body("email").notEmpty().normalizeEmail().withMessage("Must provide valid email address"),
    ]

    public confirmResetPassoword = [
        body("password1")
            .isLength({ min:8, max:25})
            .withMessage("Password must be between 8 to 25 characters")
        ,
        body("password2")
            .custom( async( value, { req})=>{

                if(req.body.password1!==value){
                    throw new Error("Passwords must match");
                }

                return true;
            })
    ]
}

const userValidator = new UserValidator(); 

export { userValidator};



