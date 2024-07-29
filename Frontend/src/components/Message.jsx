import React from 'react'

function Message({message,bg}) {
  return (
   <div className='flex flex-col'>
      <div className={`${bg} p-2 rounded-tl-xl rounded-br-xl  font-sans mt-3 `}>
        {message.message}
      </div>
      <span className='text-sm opacity-75 text-gray-950 font-sans font-semibold'>{new Date(message.createdAt).toLocaleTimeString()}</span>
    
   </div>
  )
}

export default Message
