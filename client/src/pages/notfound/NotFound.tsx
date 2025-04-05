import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-300">
            <div className="text-center border-[2px] p-8 rounded border-red-300">
                <h1 className="text-6xl font-bold text-gray-600">404</h1>
                <p className="mt-4 text-lg text-gray-600">Oops! The page you are looking for does not exist.</p>
                <Link to="/login" className="mt-6 inline-block px-4 py-2 text-white bg-red-800 rounded hover:bg-red-600 transition duration-300">Go Back Home Page</Link>
            </div>
        </div>
    );
};

export default NotFound;