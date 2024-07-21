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
    },
    profilePicture:{
        type:String,
        default:"https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg?ssl=1"
    }
},{
    timestamps:true
});

const User=mongoose.model("userdetail",userSchema)

export default User