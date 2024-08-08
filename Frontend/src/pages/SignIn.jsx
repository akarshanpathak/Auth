import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signInFailure, signInSuccess, signInStart } from '../redux/userSlice';

function SignIn() {
    const { currentUser, error, loading } = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({});

    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(signInStart());
            const res = await fetch("/api/auth/signin", {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (!res.ok) {
                dispatch(signInFailure(data.message));
            }
            if (res.ok) {
                dispatch(signInSuccess(data));
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-gradient-to-r from-gray-800 via-slate-900 to-black flex flex-col sm:flex-row text-white h-screen">
            <div className="sm:w-1/2 sm:border-b-0 sm:border-r-2 p-16 border-b-2 flex flex-col items-center sm:pt-32">
                <div className="text-center">
                    <span className="text-5xl font-bold text-orange-400">Welcome to Auth</span>
                    <br />
                    <span className="py-5 text-xl font-medium">Sign in to use our services</span>
                </div>
            </div>
            <div className="sm:w-1/2 flex flex-col items-center sm:mt-20 px-5 sm:px-0">
                <h1 className="text-center mt-5 text-5xl font-bold">
                    <span className="text-orange-400">Sign</span> In
                </h1>
                <form onSubmit={handleSubmit} className="mx-auto flex flex-col items-center justify-center mt-10 w-full max-w-md space-y-4">
                    <input
                        onChange={handleOnChange}
                        className="outline-none m-2 py-4 px-10 rounded-lg bg-transparent border-2 border-orange-900 w-full focus:border-orange-400 focus:ring focus:ring-orange-300 transition"
                        id="email"
                        placeholder="Enter your email"
                        type="email"
                    />
                    <input
                        onChange={handleOnChange}
                        className="outline-none m-2 py-4 px-10 rounded-lg bg-transparent border-2 border-orange-900 w-full focus:border-orange-400 focus:ring focus:ring-orange-300 transition"
                        id="password"
                        placeholder="Enter your password"
                        type="password"
                    />
                    <button
                        disabled={loading}
                        type="submit"
                        className={`mt-5 bg-orange-800 text-white rounded-md px-6 py-2 font-semibold hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75 transition duration-200 ${loading ? "opacity-50" : ""}`}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                    <div className="mt-4 text-lg font-medium">
                        Don't have an account?
                        <Link to='/signup' className="ml-2 text-blue-400 hover:underline">Sign up</Link>
                    </div>
                    {error && <div className="mt-7 bg-red-500 p-3 rounded-lg font-bold text-center">
                        {error}
                    </div>}
                </form>
            </div>
        </div>
    );
}

export default SignIn;
