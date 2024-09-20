import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import router from './routes/user.route.js';
import authroute from './routes/auth.route.js';
const app=express();
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('db is connnected');
}).catch((err)=>{
  console.log(err);
})
app.use(express.json());
app.listen(3000,()=>{
    console.log('server is listen to port no 3000')
})

app.use('/api/user',router);
app.use('/api/auth',authroute);

app.use((err,req,res,next)=>{
    const statuscode=err.statuscode||500;
    const  message=err.message||'Internal server error';
    return res.status(statuscode).json({
        success:false,
        statuscode,
        message,
    })
})