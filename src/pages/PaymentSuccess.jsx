import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/images/bg-ecom-1.jpg'; // Adjust the path accordingly

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  const handleContinueShopping = () => {
    // Use navigate to go to the home page
    navigate('/');
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // Clear the interval when the countdown reaches zero
    if (countdown === 0) {
      clearInterval(intervalId);
      navigate('/'); // Navigate to the home page
    }

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [countdown, navigate]);

  return (
    <div
      className="flex flex-col items-center justify-center h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-md p-8 bg-white bg-opacity-90 shadow-md rounded-lg text-center">
        <h1 className="text-4xl font-bold text-green-500 mb-4">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Thank you for your purchase.
        </p>
        <button
          type="button"
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition duration-300"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>
        <p className="text-sm text-gray-500 mt-4">
          Automatically redirecting in
          {' '}
          {countdown}
          {' '}
          seconds...
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
