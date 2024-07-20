import { errorHandler } from "../utils/error.js"
import User from "../model/user.model.js"
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"
export const signup=async (req,res,next)=>{

    const {username,email,password}=req.body
    if(!username || !email || !password || username=='' || password=='' || email==''){
        return res.status(400).json({message:"All fields are required",success:false})
    }
    
    const hashedPassword=bcryptjs.hashSync(password,12)
    const verifyExistance=await User.findOne({email})
    // console.log(verifyExistance);
        if(verifyExistance){
            // next(errorHandler(400,"User already exists"))
            return res.status(400).json({message:"User already exists",success:false})
        }
    try {

        
        const newUser=new User({
            username,
            email,
            password:hashedPassword
        })
        await newUser.save()
        // console.log(newUser._doc);
        
        res.status(200).json({message:"Signup Successfull"})
        // console.log(rest)
    } catch (error) {
        next()
    }
}


export const signin =async (req,res)=>{

    const {email,password}=req.body
    
    if(!email || !password){
        return res.status(401).json({message:"All fields are requires",success:false})
    }
    
    try {
        const validUser=await User.findOne({email})
    // console.log(validUser._doc)
    if(!validUser){
        return res.status(401).json({
            message:"User not exists",success:false
        })
    }
    const verifyPassword=bcryptjs.compareSync(password,validUser.password)
    // console.log(verifyPassword);
    if(!verifyPassword){
        return res.status(404).json({
            message:"Enter valid password",success:false
        })
    }
    const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET)
    const {password:pass,...rest}=await validUser._doc
    res
    .status(200)
    .cookie("access_token",token,{
        httpOnly: true,
    })
    .json(
        rest
    )
    } catch (error) {
       console.log(error);
    }
   
}
