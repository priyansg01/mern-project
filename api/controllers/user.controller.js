import user from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'

export const test=(req,res)=>{
    res.json({
        document:'priyansh',
    })
}


export const updateuser= async (req,res,next)=>{
    if(req.user.id!== req.params.id)   return next(errorHandler(401,'you can update your account only'))

        try {
            if(req.body.password)
                {
                    req.body.password=bcryptjs.hashSync(req.body.password,12)
                }  

            const updateuser=await user.findByIdAndUpdate(req.params.id,{
               $set: {
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                avatar:req.body.avatar,

               }
            },{new:true})

            const {password ,...rest}=updateuser._doc;
            res.status(200).json(rest);

        } catch (error) {
            next(error);
        }
}