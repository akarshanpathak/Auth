import React from 'react';

function Footer() {
    return (
        <footer className='bg-gradient-to-r from-gray-800 via-slate-900 to-black p-5 text-center'>
            <div className='flex flex-col items-center'>
                <span className='mx-4 px-4 py-2 text-2xl font-bold bg-orange-800 rounded-xl text-white'>
                    Auth
                </span>
                <p className='mt-4 text-gray-400 text-sm'>
                    &copy; {new Date().getFullYear()} Auth. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
