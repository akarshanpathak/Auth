import React, { useEffect, useState, useRef, useContext } from 'react';
import { useSelector } from 'react-redux';
import { IoSend } from "react-icons/io5";
import Message from './Message';
import { UserContext } from '../context/UserContext';
import { useGetSocketMessage } from '../context/useGetSocketMessage';
import { Link } from 'react-router-dom';

function Chat({ selectedUser }) {
  const { currentUser } = useSelector(state => state.user);
  const { conversation, setSearch } = useContext(UserContext);
  
  const inputRef = useRef();
  const scrollToEnd = useRef();
  const [formData, setFormData] = useState({});
  useGetSocketMessage();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/message/send/${selectedUser._id}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSearch(true);
        console.log("Message sent successfully");
        inputRef.current.value = '';
      }
    } catch (error) {
      console.log("Error in handleSubmit send message", error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (scrollToEnd.current) {
        scrollToEnd.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  }, [conversation]);

  if (selectedUser) {
    return (
      <div className='bg-slate-900 text-white h-screen border-b-2 sm:overflow-y-scroll scrollbar'>
        <div className="mt-4 py-2 border-t-2 flex justify-around items-center border-b-2">
          <img className='w-12 h-12 rounded-full' src={selectedUser.profilePicture} alt="" />
          <h1 className='text-center text-2xl font-semibold font-sans'>{selectedUser.username}</h1>
        </div>
        <div className='bg-slate-700 h-[62%] p-2 overflow-y-scroll scrollbar'>
          {
            conversation?.map((val) => (
              <div ref={scrollToEnd} key={val._id} className={`${val.senderId === currentUser._id ? "flex justify-end" : "flex justify-start "}`}>
                <Message message={val} bg={val.senderId === currentUser._id ? "bg-orange-900" : 'bg-slate-900'} />
              </div>
            ))
          }
        </div>
        <form className="flex border-2" onSubmit={handleSubmit}>
          <input ref={inputRef} type="text" onChange={handleChange} id='message' className='py-3 outline-none w-[90%] bg-transparent px-2' placeholder='Type message' />
          <button type='submit' className='px-2'><IoSend className='text-2xl h-12 w-10' /></button>
        </form>
       
          <div className='flex items-center justify-center mb-2'>
        <Link to='/'>
      <button className='mt-4 border-2 self-center border-orange-900 hover:bg-orange-900 duration-150 px-2 py-3 rounded-xl' >See all Users</button>
      </Link>
        </div>
       
      </div>
    );
  }
  return (
    <div className='h-[90%] flex justify-center items-center scrollbar overflow-y-scroll'>
      <h1>Select a user to start a conversation</h1>
    </div>
  );
}

export default Chat;
