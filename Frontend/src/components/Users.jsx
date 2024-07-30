import React, { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';

import User from './User';
import Loading from './Loading';
import SignIn from '../pages/SignIn';
import { UserContext } from '../context/UserContext';
// import { Navigate } from 'react-router-dom';
function Users() {
  const navigate = useNavigate();
  const { setSelectedUser, setShowChat } = useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = useState([]);
  const { currentUser } = useSelector(state => state.user);
  const [error,setError]=useState(null)

  useEffect(() => {
    const allUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers");
        const data = await res.json();
        if (res.ok && currentUser) {
          const filterData = data.filter(val => val._id !== currentUser._id);
          setLoggedInUser(filterData);
        }
        else{
          setError(data)
          console.log("all users error",data);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    allUsers();
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to="/signin" />;
  }
 if(error){
  return <Navigate to='/signin'/>
 }
  return (
    <div className={`border-2 ${loggedInUser.length ? "" : "hidden"} bg-slate-800 scrollbar mx-auto pt-4 mt-4 max-h-[77%] overflow-y-scroll`}>
      {loggedInUser.length > 0 ? (
        loggedInUser.map(val => (
          <div key={val._id} onClick={() => {
            setSelectedUser(val);
            setShowChat(true);
            navigate('/chat');
          }}>
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
