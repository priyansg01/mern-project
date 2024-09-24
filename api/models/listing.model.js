import mongoose from "mongoose";

const listingschema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },

    description:{
        type:String,
        required:true,
    },

    address:{
        type:String,
        required:true,
    },

    regularprice:{
        type:Number,
        required:true,
    },
    discountprice:{
        type:Number,
        required:true,
    },

    bathrooms:{
        type:Number,
        required:true,
    },

    bedrooms:{
        type:Number,
        required:true,
    },

    furnished:{
        type:Boolean,
        required:true,
    },
     
    parking:{
        type:Boolean,
        required:true,
    },

    type:{
        type:String,
        required:true,
    },

    offer:{
        type:Boolean,
        required:true,
    },

    imageurls:{
        type:Array,
        required:true,
    },
    userRef:{
        type:String,
        required:true,
    }


},{timestamps:true})

const Listing=mongoose.model('listing',listingschema);

export default Listing;