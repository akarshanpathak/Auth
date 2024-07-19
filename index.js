import express from "express"
import dotenv from 'dotenv'
import mongoose from "mongoose"
import authRouter from "./routes/auth.route.js"
// import { errorHandler } from "./utils/error.js"
dotenv.config()
const app=express()
app.use(express.json())
// console.log(process.env.MONGODB_URI);
const connectDb=async ()=>{
    
   try {
    const connect=await mongoose.connect(process.env.MONGODB_URI)
    console.log("MongoDb connection successful")
   } catch (error) {
    console.log("MongoDb connection failed",error)
   }
}
connectDb()
app.use(express.json())
app.get('/',(req,res)=>{
    res.json({message:"http://localhost:3000/"})
})
app.use("/api/auth",authRouter)

app.listen(process.env.PORT || 3000,()=>{
    console.log(`server is listening on port ${process.env.PORT}`)
})

app.use((err,req,res,next)=>{
   const statusCode=err.statusCode || 500;
   const message=err.message || "Internal serevr error"

   res.status(statusCode).json({
    message,
    statusCode,
    success:false
   })
})