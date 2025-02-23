import { NextFunction, Request, Response } from "express";

//higher order functions
const catchAsyncErrors = ( fn:Function)=>{
    return function( req:Request, res:Response, next:NextFunction){
        fn( req, res, next).catch((err:Error)=>next(err));
    }
}

export default catchAsyncErrors;