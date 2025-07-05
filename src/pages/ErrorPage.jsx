import React from 'react';
import { Link } from 'react-router-dom';
import { BiErrorCircle } from 'react-icons/bi';

const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 text-center p-6">
      <BiErrorCircle className="text-6xl text-red-500 mb-4" />
      <h1 className="text-5xl font-extrabold text-gray-800 mb-2">Oops! Page Not Found</h1>
      <p className="text-gray-600 text-lg mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <img
        src="https://i.ibb.co/WpqVMN65/images-2.png"
        alt="404"
        className="w-full rounded-4xl max-w-xs md:max-w-md mb-6"
      />

      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage;
