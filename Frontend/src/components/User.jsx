import React from 'react'

function User({ username, email, image }) {
  return (
    <div className='px-4 py-4 hover:bg-slate-800 flex items-center rounded-lg transition duration-200 ease-in-out cursor-pointer'>
      <img
        className='h-12 w-12 rounded-full object-cover border-2 border-gray-300'
        src={image || "https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg?ssl=1"}
        alt="User Avatar"
      />
      <div className="flex flex-col ml-4">
        <span className='text-lg font-semibold text-white'>{username}</span>
        <span className='text-sm text-gray-400'>{email}</span>
      </div>
    </div>
  )
}

export default User
