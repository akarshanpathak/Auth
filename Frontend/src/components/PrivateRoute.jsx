import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie'
function PrivateRoute() {
   console.log("private route called");
    const {currentUser}=useSelector(state=>state.user)
    // const token=Cookies.get('access_token')
  return (
    <div>
      {
        currentUser?<Outlet/>:<Navigate to='/signin'/>
      }
    </div>
  )
}

export default PrivateRoute
