import Listing from "../models/listing.model.js"
import User from "../models/user.model.js"
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

            const updateuser=await User.findByIdAndUpdate(req.params.id,{
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


export const deleteuser=async(req,res,next)=>{

    if(req.user.id!== req.params.id)   return next(errorHandler(401,'you can delete your account only'))

        try {
            await User.findByIdAndDelete(req.params.id)
            res.clearCookie('accesstoken');
            res.status(200).json('user has been deleted');

        } catch (error) {
            next(error);
        }
}



export const getUsetListings=async (req,res,next)=>{
    if(req.user.id===req.params.id)
    {
        try {
            const listings=await Listing.find({userRef:req.params.id});
            res.status(200).json(listings);
        } catch (error) {
            next(error);
        } 

    }else{
        return next(errorHandler(401,'You can only view your own Listings !'));
    }

}

export const getUser = async (req, res, next) => {
    try {
        console.log('Fetching user with ID:', req.params.id);
        
      const user = await User.findById(req.params.id);
      console.log('Fetching user witsdcsdmch ID:', user.name);
   
      if (!user) return next(errorHandler(404, 'User not found!'));
    
      const { password: pass, ...rest } = user._doc;
      
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }

}