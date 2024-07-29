import express from 'express'
import http from 'http'
import {Server} from 'socket.io'

export  const app=express()

export const server=http.createServer(app)
 
export const io=new Server(server,{
    cors:{
        origin:'http://localhost:5173',
        methods:["GET","POST","PUT"]
    }
})
 const users={}
 export  const getUserSocketId=(receiverId)=>{
    return users[receiverId]
 }
io.on("connection",(socket)=>{
     
    console.log("A user connected",socket.id);
    const userId=socket.handshake.query.userId
    if(userId){
        users[userId]=socket.id
        console.log("Hello",users)
    }
    socket.on('disconnect',()=>{
        console.log("A user disconnected");
        delete users[userId]
    })
})










