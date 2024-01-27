import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import CustomPaypalButtons from './PayPalButtons';
import { navigate } from '@reach/router';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import PropTypes from 'prop-types';
import { makePayment } from '../../redux/reducers/paymentSlice';

const CustomPaypalButtons = ({ onApprove, onError, createOrder }) => (
  <PayPalScriptProvider
    options={{ 'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID }}
  >
    <PayPalButtons
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
      onError={(err) => onError(err)}
    />
  </PayPalScriptProvider>
);

// export default CustomPaypalButtons;

const PaypalPayment = () => {
  const dispatch = useDispatch();
  const orderIdFromResponse = Number(localStorage.getItem('orderId'));
  const initialTotalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;

  const [totalPrice, setTotalPrice] = useState(initialTotalPrice);
  const [renderPaypalButtons, setRenderPaypalButtons] = useState(false); // State variable

  useEffect(() => {
    setTotalPrice(initialTotalPrice);
    setRenderPaypalButtons(true); // Set to true to render immediately
  }, [initialTotalPrice]);

  const handleApprove = async (data, actions) => {
    try {
      // Capture the payment on the server
      const response = await dispatch(
        makePayment({
          paymentType: 'PAYPAL',
          amount: totalPrice,
          orderId: orderIdFromResponse,
          accountName: '1234', // Dummy account name
          password: '1234', // Dummy password
        }),
      );

      // Capture the payment on the client side
      const order = await actions.order.capture();
      console.log('Captured Order:', order);

      console.log('PayPal Payment Successful:', response);

      // Update UI and show a success notification
      setTotalPrice(0);
      toast.success('Payment successful!');
      localStorage.removeItem('totalPrice');
      navigate('/trade/payment-success');
    } catch (error) {
      console.error('Error making PayPal Payment:', error);
    }
  };

  const handleError = (err) => {
    // Handle payment error logic here
    console.error('PayPal Payment Error:', err);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border-2 border-gray-500 bg-opacity-50 rounded-lg shadow-md text-gray-800 w-full">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        PayPal Payment
      </h2>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div className="mb-6">
          <span className="text-lg font-bold block mb-2 text-red-600">
            Payable: $
            {totalPrice.toFixed(2)}
          </span>

          {renderPaypalButtons && ( // Conditionally render based on state
            <CustomPaypalButtons
              createOrder={(data, actions) => actions.order.create({
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
          )}
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default PaypalPayment;

CustomPaypalButtons.propTypes = {
  onApprove: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  createOrder: PropTypes.func.isRequired,
};
