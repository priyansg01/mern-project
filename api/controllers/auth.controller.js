import user from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signup=async(req,res,next)=>{
    const {username,email,password}=req.body;
    const hashedpassword=bcryptjs.hashSync(password,12);
    const newuser=new user({username,email,password:hashedpassword});
    try{
        await  newuser.save()
        res.status(201).json("user created successfully")
    }
    catch(err){
        next(err)
    }
}

export const signin=async(req,res,next)=>{
    const {email,password}=req.body;
   
    try{
        const validuser=await user.findOne({email})
        if(!validuser) return next(errorHandler(404,'user not found'));
        const validpassword=bcryptjs.compareSync(password,validuser.password);
        if(!validpassword) return next(errorHandler(401,'invalid password'));
        
        //save the id or email in cookie token
        const token=jwt.sign({id:validuser._id},process.env.JWT_SECRET)

        const {password:pass,...rest}=validuser._doc//remove the password or not send again to the user or browser;

        res.cookie('accesstoken',token,{httpOnly:true/*no third party see our cookie*/,maxAge:24*60*60*1000}).status(200).json(rest);





       
    }
    catch(err){
        next(err)
    }
}
