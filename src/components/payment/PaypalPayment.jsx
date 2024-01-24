import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { makePayment } from '../../redux/reducers/paymentSlice';
import 'react-toastify/dist/ReactToastify.css';

const PaypalPayment = () => {
  const dispatch = useDispatch();
  const orderIdFromResponse = Number(localStorage.getItem('orderId')); // Get orderId from local storage
  const initialTotalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0; // Get totalPrice from local storage

  const [accountName, setAccountName] = useState('');
  const [password, setPassword] = useState('');
  const [totalPrice, setTotalPrice] = useState(initialTotalPrice);

  useEffect(() => {
    setTotalPrice(initialTotalPrice);
  }, [initialTotalPrice]);

  const handlePayment = async () => {
    // Check if the payable amount is greater than 0
    if (totalPrice === 0) {
      // Show notification if the payable amount is 0
      toast.error('Cannot process payment for $0.00');
      return;
    }

    // Check if account name and password are not empty
    if (!accountName || !password) {
      // Show notification if either field is empty
      toast.error('Please fill in both Account Name and Password.');
      return;
    }

    // Simulating API call
    try {
      const response = await dispatch(
        makePayment({
          paymentType: 'PAYPAL',
          amount: totalPrice,
          orderId: orderIdFromResponse,
          accountName,
          password,
        }),
      );
      console.log('PayPal Payment Successful:', response);
      setTotalPrice(0); // Set totalPrice to 0 after payment
      setAccountName(''); // Clear the accountName input
      setPassword(''); // Clear the password input
      // Show a success notification
      toast.success('Payment successful!');
      localStorage.removeItem('totalPrice');
    } catch (error) {
      console.error('Error making PayPal Payment:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border-2 border-gray-300 rounded-lg shadow-md text-gray-800 w-full">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        PayPal Payment
      </h2>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div className="mb-6">
          <span className="block text-sm font-semibold mb-2 text-gray-600">
            Account Name:
          </span>
          <input
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            placeholder="Your PayPal Account Name"
            className="input-field w-full border-2 border-gray-400 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <span className="block text-sm font-semibold mb-2 text-gray-600">
            Password:
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your PayPal Password"
            className="input-field w-full border-2 border-gray-400 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <span className="text-lg font-semibold block mb-2 text-gray-700">
            Payable: $
            {totalPrice.toFixed(2)}
          </span>
          <button
            type="button"
            onClick={handlePayment}
            className={`btn-primary bg-gray-800 hover:bg-red-500 text-red-500 hover:text-white py-2 px-4 rounded-full focus:outline-none ${
              totalPrice === 0 || !accountName || !password
                ? 'cursor-not-allowed'
                : ''
            }`}
            disabled={totalPrice === 0 || !accountName || !password}
          >
            Pay Now
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default PaypalPayment;
