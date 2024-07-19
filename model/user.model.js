import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    username:{
        required:true,
        unique:true,
        type:String,
    },
    email:{
        required:true,
        unique:true,
        type:String,
    },
    password:{
        required:true,
        unique:true,
        type:String,
    }
},{
    timestamps:true
});

const User=mongoose.model("userdetail",userSchema)

export default User