import { NextFunction, Response, Request } from "express";
import catchAsyncErrors from "../middleware/catch-async.js";
import { validationResult} from "express-validator";
import { userService } from "../services/user.service.js";
import { emailNotVerified, userNotFound } from "../responses/index.js";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { env } from "../config/env.config.js";

class AuthController{

    public login = catchAsyncErrors( async ( req:Request, res:Response, next:NextFunction):Promise< Response|void> =>{

      
          const err = validationResult(req);
  
          //validation error check
          if(!err.isEmpty()){
              res.status(400).json(err);
              return;
          }
  
  
          const { email, password} = req.body;
  
          //check if user found
          const user  = await userService.findUserByEmail(email);
  
          if(!user){
              return res.status(401).json({ 
                  errors: userNotFound,
              });
          }
  
  
          //check password with hashed password
  
          const validPassword = await userService.checkPassword(password, user);
  
          if(!validPassword){
              return res.status(403).json({
                  success: false,
                  errors: userNotFound,
              })
          }
  
  
          //is user verified
          if(!user.isVerified){
              return res.status(403).json({ 
                  errors: emailNotVerified
              })
          }
  
  
          //auth response { accessToken, refreshToken}
          const authResponse = await userService.generateAuthResponse( user);
  
  
          res.status(200).json({
              success:true,
              authResponse
          });
          
      })

    public refreshToken = catchAsyncErrors( async ( req:Request, res:Response, next:NextFunction)=>{

        const err = validationResult(req);

        if(!err.isEmpty()){
            return res.status(400).json(err);
        }

        const token:string|undefined = req.body.token;

        if(!token){ 
            return res.sendStatus(401);
        }
    
        //check if token is in db
        const isTokenActive = await userService.getIsTokenActive(token);
            
        if(!isTokenActive){
            return res.sendStatus(401);
        }
      

        //verify with jwt and get the user info ( if time is goes beyond 24h then user info will not come)
        jwt.verify( token, env.JWT_SECRET , async ( err:VerifyErrors|null , decoded:unknown)=>{ 
            try{

            if(err){ 
                return res.sendStatus(401);
            }

            
                const { id, email, roles} = decoded as RequestUser;
                const user = { id, email, roles}; 
                
                // auth response
                const authResponse = await userService.generateAuthResponse(user);
                return res.status(200).json({
                    success:true,
                    authResponse,
                });

            }
            catch(err){
                return res.sendStatus(401);
            }

        })

    })

    public logout = catchAsyncErrors( async ( req:Request, res:Response, next:NextFunction)=>{

        if(!req.user){ return res.sendStatus(401); }

        const userId = parseInt(req.user.id);

        await userService.userLogout( userId);


        return res.sendStatus(200);


    })

}

const authController = new AuthController();

export { authController};