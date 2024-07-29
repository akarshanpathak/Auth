import React, { useEffect, useState } from 'react'
import User from './User'
import { useSelector ,useDispatch} from 'react-redux'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
function Users() {
  const navigate=useNavigate()
  const {selectedUser,setSelectedUser,showChat,setShowChat}=useContext(UserContext)
  const [loggedInUser,setLoggedInUser]=useState([])
  const {currentUser}=useSelector(state=>state.user)
  // console.log(currentUser);
  useEffect(()=>{
    const allUsers=async()=>{
        const res=await fetch("/api/user/getusers")
        const data=await res.json()
        // console.log(data[0]);
        if(res.ok && currentUser){
          const filterData=data.filter((val)=>val._id!==currentUser._id)
          setLoggedInUser(filterData)
        }
        // console.log(loggedInUser);
       
    }
    allUsers()
  },[])
  if(selectedUser){
    console.log(selectedUser,showChat);
  }
  // console.log("selected user",selectedUser,"show chat ",showChat);

 

  return (

     
    <div className={`border-2 ${loggedInUser?"":"hidden"}  bg-slate-800 scrollbar  mx-auto pt-4 mt-4 max-h-[77%] overflow-y-scroll`}>
      {
         loggedInUser && loggedInUser.map((val,idx)=>
        
             <div key={val._id} onClick={()=>{
                 setSelectedUser(val)
                 setShowChat(true)
                 navigate('/chat')
             }} >
              <User image={val.profilePicture}  username={val.username} email={val.email}/>
             </div>
         
        )
      }
    </div>
  )
}

export default Users
