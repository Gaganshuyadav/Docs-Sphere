import { User} from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { env } from "../config/env.config.js";
import { RefreshToken } from "../models/refresh-token.model.js";
import { where } from "sequelize";
import { NextFunction } from "express";
import { mailService } from "./mail.service.js";



class UserService{

    public findUserByEmail = async ( email:string):Promise<User|null> =>{

        const user = await User.findOne({ where:{ email}});

        return user;
    }

    public createUser = async( email:string, password:string):Promise<User|null>=>{

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash( password, salt);

        const verificationToken = await jwt.sign( { email}, env.JWT_SECRET);

        const user = await User.create({ 
            email, 
            password: hashedPassword, 
            verificationToken
        });

        //call method to send verification email
        await this.sendVerificationEmail(user);


        return user;


    }

    public sendVerificationEmail = async ( user:User)=>{

        const mail = {
            from: env.PASSWORD_EMAIL,
            to: user.email,
            subject: "Welcome to Google Docs",
            text: `click the following link to verify your email : ${env.VITE_SERVER}/user/verify-email/${user.verificationToken}`
        }

            await mailService.sendMail(mail);
        


    }

    public findUserByVerificationTokenAndEmail = async ( verificationToken:string, email:string):Promise<User|null>=>{

        const user = await User.findOne({ where: {
            verificationToken,
            email
        }})

        return user;
    }

    public updateIsVerified  = async ( user:User, isVerified:boolean):Promise<void>=>{

        await User.update( { isVerified}, { where:{id: user.id} });

    }



    public checkPassword = async ( password:string, user:User):Promise<boolean | null>=>{


        const checkResult = await bcrypt.compare( password, user.password);

        return checkResult;
    }

    public generateRequestUser = async( user: User| RequestUser ):Promise<RequestUser>=>{

        if( user instanceof User){

            const userWithRoles = await User.scope("withRoles").findByPk(user.id);

            

            const roles = userWithRoles?.userRoles?.map(( userRole)=>{
                return userRole.role.name;
            });

            return { id: user.id, email: user.email, roles} as RequestUser;

        }
        else{
            return user;
        }
    }

    public generateAuthResponse = async ( user: User| RequestUser): Promise<TokenPair> =>{


        const requestUser = await this.generateRequestUser( user);

        const accessToken =  jwt.sign( requestUser, env.JWT_SECRET, { expiresIn: "24h"});

        const refreshToken = jwt.sign( requestUser, env.JWT_SECRET, { expiresIn: "24h"});
        
        
        await RefreshToken.destroy({
            where: { userId: requestUser.id }
        })

        await RefreshToken.create({ token: refreshToken, userId: requestUser.id});

        return { accessToken, refreshToken};

    }

    public getIsTokenActive = async ( token:string):Promise<boolean> =>{
        
    const refreshToken = await RefreshToken.findOne({ where:{ token}}); 
        
        return refreshToken!==null;
        
    }

    public userLogout = async ( userId:number)=>{

        //it deletes user token using userid
        await RefreshToken.destroy( { where:{ id: userId}});

    }

    public findUserById = async ( userId:string):Promise<User|null>=>{

        const user = await User.findByPk(userId);
        
        return user;
    }

    public passwordReset = async ( user: User)=>{

        const passwordResetToken = jwt.sign( { id: user.id, email: user.email}, env.JWT_SECRET, { expiresIn: "24h"});

        await User.update({ passwordResetToken}, { where:{ id: user.id}} );


        //call method to send reset password email
        await this.passwordResetEmail({ ...user, passwordResetToken} as User);

    }

    
    public passwordResetEmail = async ( user:User)=>{
        
        const mail = {
            from: env.PASSWORD_EMAIL,
            to: user.dataValues.email,
            subject: "Reset your password",
            text: `${env.VITE_SERVER}/user/refresh-token/${user.passwordResetToken}`
        }

        await mailService.sendMail(mail);

    }


    public findUserByResetPassowordToken = async ( email: string, passwordResetToken: string)=>{

        const user = await User.findOne({ where:{ email, passwordResetToken}});

        return user;

    }


    public updatePassword = async( user:User, password:string)=>{

        //hash the new password
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        await User.update({ password: hashedPassword}, { where:{ id: user.id, email: user.email}});
       
    }

}

const userService  = new UserService();

export  { userService};


