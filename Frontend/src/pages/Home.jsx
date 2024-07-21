import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
function Home() {
const {currentUser}=useSelector(state=>state.user)
  return (
    <div className='h-screen flex flex-col justify-center items-center  bg-slate-900 text-white'>
         <div className="h-[70%] w-[70%] ">
         <div className="flex justify-center items-center"> <span className='text-4xl  text-orange-700'>Welcome</span>  </div>
        <div className=' '>
        {currentUser && <div className='mx-auto flex justify-center mt-10 text-6xl font-sans'>
           {currentUser.username}
          </div>}
        <Link to='/profile'>
        <button className='border-orange-700 border-2 rounded-xl hover:bg-orange-700 duration-200 mx-auto p-3 mt-5 ml-20 font-semibold'>Update Your Profile</button>
        </Link>
        </div>
         </div>

         
    </div>
  )
}

export default Home
