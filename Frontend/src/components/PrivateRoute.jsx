import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
function PrivateRoute() {
    const {currentUser}=useSelector(state=>state.user)
  return (
    <div>
      {
        currentUser?<Outlet/>:<Navigate to='/signin'/>
      }
    </div>
  )
}

export default PrivateRoute
