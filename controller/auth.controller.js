import { errorHandler } from "../utils/error.js"
import User from "../model/user.model.js"
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser"
import Otp from "../model/user.otp.model.js"
import otpGenerator from 'otp-generator'
import twilio from 'twilio'
export const signup=async (req,res,next)=>{

    const {username,email,password,phoneNumber}=req.body
    if(!username || !email || !password || !phoneNumber || phoneNumber=='' || username=='' || password=='' || email==''){
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
            password:hashedPassword,
            phoneNumber
        })
        await newUser.save()
        console.log(newUser._doc);
        
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


export const signout=async (req,res,next)=>{
    
     try {
        
         res.status(200).clearCookie('access_token').json({message:"Signout successfull",success:true}) 

     } catch (error) {
        console.log(error);
     }

}


export const signinWithPhoneNumber=async(req,res,next)=>{

  const {phoneNumber}=req.body
  if(!phoneNumber || phoneNumber==''){
    return res.status(401).json({message:"Please enter your phone number"})
  }
  const twilioClient=new twilio(process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN)

  const findPhoneNumber=await Otp.findOne({phoneNumber})
 
    try {
        if(!findPhoneNumber){
        const otp=otpGenerator.generate(4,{upperCaseAlphabets:false,lowerCaseAlphabets:false,
            specialChars:false
          })
    
        const newOtp=new Otp({
            phoneNumber,
            otp
        })
        const sendOtp=await twilioClient.messages.create({
            body:"Your verification OTP is "+otp,
            from:process.env.TWILIO_PHONE_NUMBER,
            to:phoneNumber
        })
        // console.log("otp send successfully",sendOtp)
        await newOtp.save()
        res.status(201).json({message:"Otp send successfully",success:true})
        return
    }
    
   
 
    const otp=otpGenerator.generate(4,{upperCaseAlphabets:false,lowerCaseAlphabets:false,
        specialChars:false
    })

    const updatedOtp=await Otp.findOneAndUpdate({phoneNumber:phoneNumber},{
        $set:{
            phoneNumber,otp
        }
    },{new:true})
    const sendOtp=await twilioClient.messages.create({
        body:"Your verification OTP is "+otp,
        from:process.env.TWILIO_PHONE_NUMBER,
        to:phoneNumber
    })
    console.log("otp send successfully",sendOtp)
    // console.log(updatedOtp);
    res.status(201).json(updatedOtp)
}catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", success: false })
}

}