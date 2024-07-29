import bcryptjs from 'bcryptjs'
import User from '../model/user.model.js'
export const updateUser=async (req,res,next)=>{


    if(req.params.userId!==req.user.id){
       return res.status(401).json({message:"You are not allowed to update this user"})
    }

    if(req.body.username){


        if(req.body.username.length<6 || req.body.username.length>20){
            return res.status(401).json({message:"Username must betwwwn 6 and 20 character"})
        }


        if(req.body.username.includes(' ') ){
            return res.status(401).json({message:"Username can not contain spaces"})
        }


        if(req.body.username !== req.body.username.toLowerCase()){
            return res.status(401).json({message:"Username must be in lowercase"})
        }     


        if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
            return res.status(401).json({message:"Username can not contain special character"})
        }
    }


    if(req.body.password){

        if(req.body.password.length<6 || req.body.password.length>20){
            return res.status(401).json({message:"Password must betwwwn 6 and 20 character"})
        }
        req.body.password=bcryptjs.hashSync(req.body.password,10)
    }

    try {
        const updatedUser=await User.findByIdAndUpdate(req.params.userId,{
            $set:{
                username:req.body.username,
                password:req.body.password,
                profilePicture:req.body.profilePicture,
                email:req.body.email
            }
        },{new:true})
        const {password,...rest}=updatedUser._doc

        res.status(201).json(rest)
    } catch (error) {
        console.log(error);
    }
}

export const getUsers=async(req,res,next)=>{
    try {
        const users=await User.find()
       
        await  res.status(201).json(users)
    } catch (error) {
        console.log("Error in get users",error);
    }
}