import React from 'react'

function Message({ message, bg }) {
  return (
    <div className='flex flex-col max-w-xs mx-2 my-3'>
      <div className={`${bg} p-3 rounded-tl-xl rounded-br-xl rounded-tr-sm rounded-bl-sm font-sans shadow-md`}>
        {message.message}
      </div>
      <span className='text-xs opacity-75 text-gray-500 font-sans font-medium mt-1 self-end'>
        {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  )
}

export default Message
