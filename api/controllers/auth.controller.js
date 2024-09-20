import user from "../models/user.model.js";
import bcryptjs from 'bcryptjs'

export const signup=async(req,res)=>{
    const {username,email,password}=req.body;
    const hashedpassword=bcryptjs.hashSync(password,12);
    const newuser=new user({username,email,password:hashedpassword});
    try{
        await  newuser.save()
        res.status(201).json("user created successfully")

    }
    catch(err){
        res.status(500).json(err.message);
    }
}