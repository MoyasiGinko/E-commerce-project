import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import backgroundImage from '../assets/images/bg-ecom-4.jpg';
import cartImage from '../assets/images/cart1.gif';
import { getUserData } from '../utils/userStorage';

const SplashScreen = () => {
  const navigate = useNavigate();
  const currentUser = getUserData();

  useEffect(() => {
    if (currentUser) {
      navigate('/trade');
    }
  }, [currentUser, navigate]);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/register');
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center p-4 bg-gray-800">
        {/* Logo in the middle */}
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-white text-2xl font-bold">
            MicroCommerce
          </Link>
        </div>

        {/* Login and Signup buttons */}
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handleSignup}
            className="text-white hover:text-gray-300 focus:outline-none"
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={handleLogin}
            className="text-white hover:text-gray-300 focus:outline-none"
          >
            Log In
          </button>
        </div>
      </nav>

      {/* Main content */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center splash-container"
        style={{
          background: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-white bg-opacity-10 p-12 text-center rounded-full shadow-lg mb-8">
          <div className="flex justify-center items-center mb-4">
            <img src={cartImage} alt="Loading Animation" className="w-60" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 font-merriweather">
            Welcome to MicroCommerce
          </h1>
          <p className="text-lg font-bold text-accent text-white mb-6 font-open-sans">
            Explore a world of possibilities for customers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
