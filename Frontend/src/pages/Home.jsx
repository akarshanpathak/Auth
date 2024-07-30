import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import Users from '../components/Users'
import Chat from '../components/Chat'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { lazy,Suspense } from 'react'
import Loading from '../components/Loading'
const Users=lazy(()=>import('../components/Users'))
function Home() {
const {currentUser}=useSelector(state=>state.user)
const {selectedUser}=useContext(UserContext)
console.log("In home Component");

  return (
    <div className=' scrollbar  bg-slate-900 text-white'>
      <h2 className='font-semibold font-sans text-2xl underline text-center'>Available Users</h2>
     <div className="flex h-screen justify-center">
        <div className='sm:w-[30%] '>
        <Suspense fallback={<Loading/>}>
        <Users/> 
        </Suspense>
        {/* <Loading/> */}
        </div>
        <div className='hidden sm:w-[70%] sm:inline '>
        <Chat selectedUser={selectedUser}/>  
        </div>  
     </div>
    </div>
  )
}

export default Home
