import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div>
      
     <div className='h-screen bg-slate-900 text-white  flex justify-center items-center flex-col font-semibold font-sans'>
      <h1>Select an user to start a conversation </h1>
      <Link to='/'>
      <button className='mt-4 border-2 border-orange-900 hover:bg-orange-900 duration-150 px-2 py-3 rounded-xl' >See all Users</button>
      </Link>
     
     </div>
   
    </div>
  )
}

export default NotFound
