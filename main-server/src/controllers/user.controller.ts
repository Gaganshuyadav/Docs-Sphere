import { NextFunction, Request, Response } from "express"
import catchAsyncErrors from "../middleware/catch-async.js"
import { validationResult } from "express-validator"
import { userService } from "../services/user.service.js";
import { resetPassword } from "../responses/index.js";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { env } from "../config/env.config.js";



class UserCotroller{

    public register = catchAsyncErrors( async ( req: Request, res: Response, next: NextFunction)=>{

        const err = validationResult(req);

        if(!err.isEmpty()){
            return res.status(400).json(err);
        }

        const { email, password1} = req.body;

        //send email as well
        const user = await userService.createUser(email, password1);


        res.status(200).json({ 
            message: "success", 
            user
        });

    })

    public verifyEmail = catchAsyncErrors( async( req:Request, res:Response)=>{

        const verificationToken = req.params.token;

        jwt.verify( verificationToken, env.JWT_SECRET, async  ( err:VerifyErrors|null , decoded:unknown)=>{

            if(err){
                return res.sendStatus(403);
            }

            //use email from verification token
            const { email} = decoded as { email:string};
            
            userService.findUserByVerificationTokenAndEmail( verificationToken, email)
            .then((user)=>{

                if(!user){
                    return res.sendStatus(400);
                }

                try{

                    userService.updateIsVerified( user, true)
                    .then(()=>{
                        res.sendStatus(200);
                    })
                    .catch(()=>{
                        return res.sendStatus(500);
                        
                    })
    

                }
                catch(err){
                    return res.sendStatus(403);
                }

            })

            .catch(()=>{
                return res.sendStatus(500);
            })


        })
    }) 

    public getUser = catchAsyncErrors( async( req:Request, res:Response, next:NextFunction):Promise<Response|void>=>{

        const userId = req.params.id;

        const userDetails = await userService.findUserById(userId); 

        if(userDetails==null){
            return res.sendStatus(400);
        }

        return res.status(200).json({
            success:true, 
            userDetails
        })

    })

    public resetPassword = catchAsyncErrors( async ( req:Request, res:Response, next:NextFunction)=>{

        const err = validationResult(req);

        if(!err.isEmpty()){
            return res.sendStatus(400);
        }

        const { email } = req.body;

        const user = await userService.findUserByEmail(email);

        if(!user){
            return res.status(404).json(resetPassword);
        }

        //send email as well
        await userService.passwordReset( user);
        

        res.status(200).json({ resetPassword});

    })


    public confirmResetPassword = catchAsyncErrors( async ( req:Request, res:Response, next:NextFunction)=>{
        
        const err = validationResult(req);


        if(!err.isEmpty()){
            return res.status(400).json(err);
        }

        const resetPasswordToken = req.params.token;
        const { password1, password2} = req.body;

        jwt.verify( resetPasswordToken, env.JWT_SECRET, async ( err: VerifyErrors|null, decoded:unknown ) =>{

            if(err){
                return res.sendStatus(403);
            }


            try{

            
                const { id, email} = decoded as { id:string, email:string};
    
                //find user by reset password token 
                const user = await userService.findUserByResetPassowordToken( email, resetPasswordToken);
    
                if(!user){
                    return res.sendStatus(400);
                }
    
                //update password in db 
                userService.updatePassword( user, password1).then(()=>{
                    res.sendStatus(200);
                })
                .catch(()=>{
                    res.sendStatus(500);
                })

            }
            catch(err){
                res.sendStatus(500);
            }


            
        })

        
    


    })

    

}


const userCotroller = new UserCotroller();

export { userCotroller};