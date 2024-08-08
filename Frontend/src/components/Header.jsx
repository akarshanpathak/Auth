import React, { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOutSuccess } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showHamburger, setShowHamburger] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const { currentUser } = useSelector(state => state.user);

    const handleMenu = () => {
        setShowHamburger(prev => !prev);
    };

    const handleSignout = async () => {
        try {
            const res = await fetch("/api/auth/signout", {
                method: 'PUT'
            });
            if (res.ok) {
                dispatch(signOutSuccess());
                navigate('/signin');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='bg-gradient-to-r from-gray-800 via-slate-900 to-black text-white relative py-4 flex justify-between sm:justify-around px-3'>
            <div>
                <Link to='/'>
                    <span className='mx-4 px-4 py-2 text-2xl font-bold bg-orange-800 rounded-xl'>Auth</span>
                </Link>
            </div>
            <div className="hidden sm:flex items-center">
                <ul className='flex space-x-4'>
                    <Link to='/'>
                        <li className='text-xl text-gray-200 hover:underline hover:text-gray-300 px-2'>Home</li>
                    </Link>
                    <Link to='/about'>
                        <li className='text-xl text-gray-200 hover:underline hover:text-gray-300 px-2'>About</li>
                    </Link>
                    <Link to='https://github.com/akarshanpathak'>
                        <li className='text-xl text-gray-200 hover:underline hover:text-gray-300 px-2'>Projects</li>
                    </Link>
                    <Link to='/profile'>
                        <li className='text-xl text-gray-200 hover:underline hover:text-gray-300 px-2'>Profile</li>
                    </Link>
                </ul>
            </div>
            <Link to='/signin'>
                {!currentUser && <div className="hidden sm:block border-2 rounded-md border-orange-800 px-3 py-2 font-semibold hover:bg-orange-800 transition duration-200">Sign In</div>}
            </Link>
            <div className="flex items-center">
                {currentUser && (
                    <div onClick={() => setShowProfile(prev => !prev)} className="hidden sm:flex items-center cursor-pointer">
                        <img className='h-10 w-10 rounded-full' src={currentUser.profilePicture || "https://i0.wp.com/www.repol.copl.ulaval.ca/wp-content/uploads/2019/01/default-user-icon.jpg?ssl=1"} alt="Profile" />
                    </div>
                )}
                {showProfile && currentUser && (
                    <div className="absolute top-16 right-0 mt-3 px-3 bg-slate-700 border-2 border-gray-200 rounded-lg shadow-lg">
                        <ul className='mt-2 flex flex-col items-start p-3'>
                            <li className='font-semibold my-1'><span>Username:</span> {currentUser.username}</li>
                            <Link to='/profile'>
                                <li className='font-semibold my-1 cursor-pointer'>Profile</li>
                            </Link>
                            <li onClick={handleSignout} className='font-semibold my-1 cursor-pointer'>Sign Out</li>
                        </ul>
                    </div>
                )}
                {currentUser && (
                    <div onClick={handleMenu} className='sm:hidden cursor-pointer'>
                        <GiHamburgerMenu size="2em" />
                    </div>
                )}
            </div>
            {showHamburger && currentUser && (
                <div className='sm:hidden absolute top-16 left-0 w-full bg-slate-900 border-t-2 border-gray-200 shadow-lg'>
                    <ul className='flex flex-col items-start p-3 space-y-2'>
                        <Link to='/'>
                            <li className='hover:underline py-2 px-1 text-white font-semibold hover:text-orange-600'>Home</li>
                        </Link>
                        <Link to='/about'>
                            <li className='hover:underline py-2 px-1 text-white font-semibold hover:text-orange-600'>About</li>
                        </Link>
                        <Link to='https://github.com/akarshanpathak'>
                            <li className='hover:underline py-2 px-1 text-white font-semibold hover:text-orange-600'>Projects</li>
                        </Link>
                        <Link to='/profile'>
                            <li className='hover:underline py-2 px-1 text-white font-semibold hover:text-orange-600'>Profile</li>
                        </Link>
                        <li onClick={handleSignout} className='hover:underline py-2 px-1 text-white font-semibold hover:text-orange-600'>Sign Out</li>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Header;
