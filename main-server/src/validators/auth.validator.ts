import { body } from "express-validator"

class AuthValidator{

    public login = [ 
        body("email").notEmpty().normalizeEmail().withMessage("Must provide valid email address"),
        body("password").notEmpty().withMessage("Must provide a password"),
    ];
    
    public refreshToken = [
        body("token").notEmpty().exists().withMessage("Must provide a valid token"),
    ]
}


const authValidator = new AuthValidator();

export { authValidator};










