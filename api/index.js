import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import router from './routes/user.route.js';
const app=express();
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('db is connnected');
}).catch((err)=>{
  console.log(err);
})

app.listen(3000,()=>{
    console.log('server is listen to port no 3000')
})

app.use('/api/user',router);