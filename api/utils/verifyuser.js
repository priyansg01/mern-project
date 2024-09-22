
import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifytoken=(req,res,next)=>{
    const token=req.cookies.accesstoken;
    if(!token)  return next(errorHandler(401,'unauthorized'));
    
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err) return next(errorHandler(403,'token not verify or forbidden'))


            req.user=user;
            next(); //call the next function or update in user route after the verify the verifytoken
    })
    
 
}