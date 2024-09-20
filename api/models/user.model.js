import { timeStamp } from "console";
import mongoose from "mongoose";
import { type } from "os";
const userSchema=mongoose.Schema({
    username:{
        type:string,
        required: true,
        unique:true,

    },
    email:{
        type:string,
        required: true,
        unique:true,

    },
    password:{
        type:string,
        required: true,

    },


},{timeStamp:true});

const user=mongoose.model('User',userSchema);
export default user;