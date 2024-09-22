import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'


export const signup=async(req,res,next)=>{
    const {username,email,password}=req.body;
    const hashedpassword=bcryptjs.hashSync(password,12);
    const newuser=new User({username,email,password:hashedpassword});
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
        const validuser=await User.findOne({email})
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


// export const google =async (req,res,next)=>{
//     try {
//         //chcek user is exist or not otherwise we create the user 

//         const user=await user.findOne({email:req.body.email})
//         if(user){
//           //user exist then registered the user 

//              const token=jwt.sign({id:user._id},process.env.JWT_SECRET)

//             const {password:pass,...rest}=user._doc//remove the password or not send again to the user or browser;

//             res.cookie('accesstoken',token,{httpOnly:true/*no third party see our cookie*/,maxAge:24*60*60*1000}).status(200).json(rest);

//         }
//         else
//         {
//             //create the user but in usermodel password is required but google don,t share the password so it will give en error because google se authenticate karne par password nhi ata 
//             //so we create a random password and later user will update that password 
//             const generatedPassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8) ;  //16 character password secured password

//             const hashedpassword=bcryptjs.hashSync(generatedPassword,12);

//             const newuser=new user({
//                 username:req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-4),
//                 email:req.body.email,
//                 password:hashedpassword,
//                 avatar:req.body.photo
//             })
//             await newuser.save();
//             const token=jwt.sign({id:newuser._id},process.env.JWT_SECRET)
//             const {password:pass,...rest}=newuser._doc
//             res.cookie('accesstoken',token,{httpOnly:true/*no third party see our cookie*/,maxAge:24*60*60*1000}).status(200).json(rest);

//         }
        
//     } catch (error) {
//         next(error);
//     }
// }



export const google = async (req, res, next) => {
    try {
      const founduser = await User.findOne({ email: req.body.email })
      if (founduser) {
        const token = jwt.sign({ id: founduser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = user._doc;
        res
          .cookie('access_token', token, { httpOnly: true })
          .status(200)
          .json(rest);
          
      } else {
        const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
        const newUser = new User({ username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4) , email: req.body.email, password: hashedPassword, avatar: req.body.photo });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
        const { password: pass, ...rest } = newUser._doc;
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
        
      }
    } catch (error) {
      next(error)
    }
  }