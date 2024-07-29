import Conversation from '../model/conversation.model.js'
import Message from '../model/message.model.js'
import { getUserSocketId, io } from '../SocketIo/server.js'
export const sendMessage=async (req,res,next)=>{
    const {message}=req.body
    if(!message || message===''){
        return res.status(401).json({message:"Can't send empty message"})
    }
    const senderId=req.user.id
    const receiverId=req.params.receiverId
    try {
        const conversation=await Conversation.findOne({
            members:{$all:[senderId,receiverId]}
        })
        if(!conversation){
            const newConversation=await Conversation.create({
                members:[senderId,receiverId]
            })
        }         
        const newMessage=new Message({
            senderId,
            receiverId,
            message
        })
        if(newMessage){
            conversation.messages.push(newMessage._id)
        }
        await Promise.all([conversation.save(),newMessage.save()])
        
        res.status(201).json({message:"Message sent successfully",success:true})
    } catch (error) {
        console.log("Error in send message",error)
    }
}

export const getMessage=async(req,res,next)=>{
   try {
     const senderId=req.user.id 
     const receiverId=req.params.receiverId
     const conversation=await Conversation.findOne({
         members:{$all:[senderId,receiverId]}
     })
     
     if(!conversation){
         return res.status(401).json({message:"No conversation yet send Hii.. to start conversation"})
     }
     
     const data=await conversation.populate('messages')
     const receiverSocketId=getUserSocketId(receiverId)
     if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", data.messages);
      }
     res.status(201).json(data.messages)
    //  console.log(data.messages);
 
    } catch (error) {
        console.log('Error in getMessage',error);
        next()
    }
}