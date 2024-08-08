import React, { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';

import User from './User';
import Loading from './Loading';
import { UserContext } from '../context/UserContext';

function Users() {
  const navigate = useNavigate();
  const { setSelectedUser, setShowChat } = useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = useState([]);
  const { currentUser } = useSelector(state => state.user);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers");
        const data = await res.json();
        if (res.ok && currentUser) {
          const filterData = data.filter(val => val._id !== currentUser._id);
          setLoggedInUser(filterData);
        } else {
          setError(data);
          console.log("Error fetching users:", data);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
        setError(error.message);
      }
    };
    fetchUsers();
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to="/signin" />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900 text-white">
        <h1 className="text-xl font-semibold">Error: {error}</h1>
      </div>
    );
  }

  return (
    <div className={`bg-slate-800 scrollbar rounded-xl mx-auto pt-4 mt-4 max-h-[77%] overflow-y-scroll ${loggedInUser.length ? "" : "hidden"} sm:max-w-md md:max-w-lg lg:max-w-xl`}>
      {loggedInUser.length > 0 ? (
        loggedInUser.map(val => (
          <div 
            key={val._id} 
            className="flex items-center p-4 mb-2 bg-slate-700 rounded-lg cursor-pointer hover:bg-slate-600 transition-colors"
            onClick={() => {
              setSelectedUser(val);
              setShowChat(true);
              navigate('/chat');
            }}
          >
            <User image={val.profilePicture} username={val.username} email={val.email} />
          </div>
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Users;
