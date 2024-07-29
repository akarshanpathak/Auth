import { useContext, useEffect } from "react";

import { UserContext } from "./UserContext";
import { SocketContext } from "./SocketContext";


export const useGetSocketMessage=()=>{

    const {socket}=useContext(SocketContext)
    
    const {conversation,setConversation,selectedUser} =useContext(UserContext)
    const handleNewMessage=(newMessage)=>{
        console.log("useGetSocketMessage",newMessage);
        setConversation([...conversation,newMessage])
    }
    useEffect(()=>{
        if(socket){
            socket.on("newMessage",handleNewMessage)
             return () => {
                 socket.off("newMessage", handleNewMessage);
               };
        }
    },[selectedUser,conversation,socket])
}

