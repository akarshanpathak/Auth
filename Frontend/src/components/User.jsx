import React from 'react'

function User({username,email,image}) {
  return (
    <div className='px-2 py-3 hover:bg-slate-900  flex items-center scrollbar'>
      <img className='h-10 w-10 rounded-full' src={image || "https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg?ssl=1"} alt="" />
      <div className="flex flex-col ml-6">
        <span>{username}</span>
        <span>{email}</span>
      </div>
    </div>
  )
}

export default User
