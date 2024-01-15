import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentGateway = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || 0;

  useEffect(() => {
    // You can use useEffect for any side effects or initialization if needed
    // For example, console.log('Component mounted');
    // If you don't have any side effects or initialization, you can remove useEffect
  }, []);

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleExpiryDateChange = (e) => {
    setExpiryDate(e.target.value);
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulated payment processing logic
    console.log('Payment processed successfully!');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border-2 border-gray-300 rounded-lg shadow-md text-gray-800 w-full">
      <h2 className="text-2xl font-bold mb-4">Payment Gateway</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <span className="block text-sm font-semibold mb-2">Card Number:</span>
          <input
            type="text"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1234 XXXX 9012 XXXX"
            className="input-field w-full border-2 border-gray-400 rounded-full px-4 py-2"
          />
        </div>

        <div className="mb-4">
          <span className="block text-sm font-semibold mb-2">Expiry Date:</span>
          <input
            type="text"
            value={expiryDate}
            onChange={handleExpiryDateChange}
            placeholder="MM/YY"
            className="input-field w-full border-2 border-gray-400 rounded-full px-4 py-2"
          />
        </div>

        <div className="mb-4">
          <span className="block text-sm font-semibold mb-2">CVV:</span>
          <input
            type="text"
            value={cvv}
            onChange={handleCvvChange}
            placeholder="123"
            className="input-field w-full border-2 border-gray-400 rounded-full px-4 py-2"
          />
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">
            Total Amount: $
            {totalPrice.toFixed(2)}
          </span>
          <button
            type="submit"
            className="btn-primary bg-gray-800 hover:bg-red-500 text-red-500 hover:text-white py-2 px-4 rounded-full"
          >
            Pay Now
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentGateway;
