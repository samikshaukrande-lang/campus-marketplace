import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true
    },


    email:{
        type:String,
        required:true,
        unique:true
    },


    college:{
        type:String,
        required:true
    },


    password:{
        type:String,
        required:true
    },


    phone:{
        type:String,
        default:""
    },


    department:{
        type:String,
        default:""
    },


    profileImage:{
        type:String,
        default:""
    },


    role:{
        type:String,
        default:"student"
    },


},
{
    timestamps:true
}
);


const User = mongoose.model("User", userSchema);


export default User;