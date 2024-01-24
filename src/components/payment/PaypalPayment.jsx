import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { makePayment } from '../../redux/reducers/paymentSlice';
import 'react-toastify/dist/ReactToastify.css';

const PaypalPayment = () => {
  const dispatch = useDispatch();
  const orderIdFromResponse = Number(localStorage.getItem('orderId'));
  const initialTotalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;

  const [accountName, setAccountName] = useState('');
  const [password, setPassword] = useState('');
  const [totalPrice, setTotalPrice] = useState(initialTotalPrice);

  useEffect(() => {
    setTotalPrice(initialTotalPrice);
  }, [initialTotalPrice]);

  const handleApprove = async (data, actions) => {
    try {
      // Capture the payment on the server
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

      // Update UI and show a success notification
      setTotalPrice(0);
      setAccountName('');
      setPassword('');
      toast.success('Payment successful!');
      localStorage.removeItem('totalPrice');
    } catch (error) {
      console.error('Error making PayPal Payment:', error);
    }
  };

  const handleError = (err) => {
    // Handle payment error logic here
    console.error('PayPal Payment Error:', err);
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

          <PayPalScriptProvider
            options={{ 'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID }}
          >
            <PayPalButtons
              createOrder={(data, actions) =>
                // Create the order details
                actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: totalPrice.toFixed(2),
                      },
                    },
                  ],
                })}
              onApprove={handleApprove}
              onError={handleError}
            />
          </PayPalScriptProvider>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default PaypalPayment;
