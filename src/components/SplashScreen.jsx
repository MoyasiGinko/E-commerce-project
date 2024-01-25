import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div
      className="flex h-screen items-center justify-center splash-container"
      style={{
        background: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white bg-opacity-10 p-12 text-center rounded-full shadow-lg">
        <div className="flex justify-center items-center">
          <img src={cartImage} alt="Loading Animation" className="w-60" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-4 font-merriweather">
          Welcome to MicroCommerce
        </h1>
        <p className="text-lg font-bold text-accent text-white mb-6 font-open-sans">
          Explore a world of possibilities for customers.
        </p>
        <div className="flex flex-row justify-center space-x-4">
          <button
            type="button"
            onClick={handleSignup}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold py-2 px-3 rounded-full focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
          <button
            type="button"
            onClick={handleLogin}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-2 px-3 rounded-full focus:outline-none focus:shadow-outline"
          >
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
