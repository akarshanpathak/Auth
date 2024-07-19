import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
function Header() {
  return (
   <div>
     <div className='bg-slate-900 text-white py-4 flex justify-between sm:justify-around items-center px-3' >
      <div>
      <span className='mx-4 px-4 py-2   text-2xl font-bold font- bg-orange-800 rounded-xl text-center '>Auth</span>
      </div>
      <div className="hidden sm:inline">
        <ul className='flex justify-between'>
            <li className='mx-3 text-xl text-gray-200 font-normal hover:underline hover:text-gray-300 px-2 font-sans'>Home</li>
            <li className='mx-3 text-xl text-gray-200 font-normal hover:underline hover:text-gray-300 px-2 font-sans'>About</li>
            <li className='mx-3 text-xl text-gray-200 font-normal hover:underline hover:text-gray-300 px-2 font-sans duration-300 '>Pojects</li>
            
            
        </ul>
      </div>
      <div className="hidden sm:inline border-2 rounded-md border-orange-800 px-3 py-2 font-semibold hover:bg-orange-800 duration-200">Sign In</div>
        <div className="hidden sm:inline">
            <img className='h-10 w-10 rounded-full' src="https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg?ssl=1" alt="" />
        </div>
      <div className='sm:hidden px-10px'><GiHamburgerMenu className='' size="2em"/></div>
    </div>

   </div>
  )
}

export default Header
