import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import {Link} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux';
import { signOutSuccess } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
function Header() {
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const [showHamburger,setShowHamburger]=useState(false)
  const [showProfile,setShowProfile]=useState(false)
  const {currentUser}=useSelector(state=>state.user)
  const handleMenu=()=>{
    setShowHamburger((prev)=>!prev)
    console.log(showHamburger)
    // console.log("helloo");
  }
  const handleSignout=async()=>{
    try {
      const res=await fetch("/api/auth/signout",{
        method:'PUT'
      })
      if(res.ok){
        dispatch(signOutSuccess())
        navigate('/signin')
        // console.log("signout successfull");
      }
    } catch (error) {
      
    }
  }
  return (
   <div className=''>
     <div className='bg-slate-900  text-white relative py-4 flex justify-between sm:justify-around pt-6 px-3' >
      <div><Link to='/'>
      <span className='mx-4 px-4 py-2   text-2xl font-bold font- bg-orange-800 rounded-xl text-center '>Auth</span>   </Link>
      </div>
      <div className="hidden sm:inline">
        <ul className='flex justify-between'>
            <Link to='/'>
            <li className='mx-3 text-xl text-gray-200 font-normal hover:underline hover:text-gray-300 px-2 font-sans'>Home</li>
            </Link>
            <Link to='/about'>
            <li className='mx-3 text-xl text-gray-200 font-normal hover:underline hover:text-gray-300 px-2 font-sans'>About</li>
            </Link>
            <Link to='https://github.com/akarshanpathak'>
            <li className='mx-3 text-xl text-gray-200 font-normal hover:underline hover:text-gray-300 px-2 font-sans duration-300 '>Pojects</li>
            </Link>
            <Link to='/profile'>
            <li className='mx-3 text-xl text-gray-200 font-normal hover:underline hover:text-gray-300 px-2 font-sans duration-300 '>Profile</li>
            </Link>
            
            
        </ul>
      </div>
      <Link to={'/signin'}>
      {
        !currentUser && <div className="hidden sm:inline border-2 rounded-md border-orange-800 px-3 py-2 font-semibold hover:bg-orange-800 duration-200">Sign In</div>
      }
      </Link>
     <div className="flex flex-col justify-end">
     {currentUser &&  <div onClick={()=>{
      setShowProfile((prev)=>!prev)
     }} className="hidden  sm:flex sm:justify-end">
          <img className='h-10 w-10 rounded-full' src={currentUser.profilePicture || "https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg?ssl=1"} alt="" />

      </div>}
      {
        showProfile && currentUser && <div className="border-2  border-gray-200 relative top-0 mt-3 px-3 bg-slate-700">
        <ul className='mt-2 flex flex-col justify-start '>
        <li className='font-semibold font-sans  my-1'><span>Username-</span> {currentUser && currentUser.username}</li>
         <Link to='/profile'>
         <li className='font-semibold font-sans  my-1'>Profile</li>
         </Link>
         <li onClick={handleSignout} className='font-semibold font-sans  my-1'>SignOut</li>
        </ul>
       </div>
      }
     </div>
      {currentUser && <div onClick={handleMenu} className='sm:hidden px-10px'><GiHamburgerMenu className=''  size="2em"/></div>}
      
    </div>
    {
      showHamburger && currentUser && <div className='sm:hidden '>
      <div >
        <ul className='bg-slate-900 px-7 py-3 border-b-2 pb-4'>
          <li className='hover:underline py-2 px-1 text-white font-sans font-semibold hover:text-orange-600'>Home</li>
          <li className='hover:underline py-2 px-1 text-white font-sans font-semibold hover:text-orange-600'>About</li>
          <li className='hover:underline py-2 px-1 text-white font-sans font-semibold hover:text-orange-600'>Project</li>
          <Link to='/profile'>
          <li className='hover:underline py-2 px-1 text-white font-sans font-semibold hover:text-orange-600'>Profile</li>
          </Link>
          <li className='hover:underline py-2 px-1 text-white font-sans font-semibold hover:text-orange-600' onClick={handleSignout}>Signout</li>
        </ul>
      </div>
    </div>
    }
   </div> 
  )
}

export default Header
