import React from 'react';
import { Link } from 'react-router-dom';

const RouteNotFound = () => {
  return (
    <div className='h-screen text-white flex justify-center items-center flex-col'>
      <h1 className='text-4xl'>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to='/'>
      <button className='mt-4 border-2  p-2 rounded-xl border-orange-900 hover:bg-orange-900'>Go to Home</button>
      </Link>
    </div>
  );
};

export default RouteNotFound;
