import express from "express"
import dotenv from 'dotenv'
import mongoose from "mongoose"
import authRouter from "./routes/auth.route.js"
import userRouter from './routes/user.route.js'
import cookieParser from "cookie-parser"
import path from 'path'
import {app,server} from './SocketIo/server.js'
import messageRouter from './routes/message.route.js'
// import { errorHandler } from "./utils/error.js"
dotenv.config()
const __dirname = path.resolve();
console.log(__dirname);
app.use(express.json())
app.use(cookieParser())
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
app.use("/api/user",userRouter)
app.use("/api/message",messageRouter)

// app.use(express.static(path.join(__dirname, '/Frontend/dist')));

server.listen(process.env.PORT || 3000,()=>{
    console.log(`server is listening on port ${process.env.PORT}`)
})
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'Frontend', 'dist', 'index.html'));
//   });
app.use((err,req,res,next)=>{
   const statusCode=err.statusCode || 500;
   const message=err.message || "Internal serevr error"

   res.status(statusCode).json({
    message,
    statusCode,
    success:false
   })
})