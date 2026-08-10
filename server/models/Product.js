import mongoose from "mongoose";


const productSchema = new mongoose.Schema(

{

    title:{
        type:String,
        required:true
    },


    description:{
        type:String,
        required:true
    },


    price:{
        type:Number,
        required:true
    },


    category:{
        type:String,
        required:true
    },


    image:{
        type:String
    },


    condition:{
        type:String,
        required:true
    },


    college:{
        type:String,
        required:true
    },


    pickupLocation:{
        type:String,
        required:true
    },


    contactNumber:{
        type:String,
        required:true
    },


    seller:{

        type:mongoose.Schema.Types.ObjectId,

        ref:"User",

        required:true

    }


},

{
    timestamps:true
}

);



const Product = mongoose.model(
    "Product",
    productSchema
);


export default Product;