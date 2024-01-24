import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import { makePayment } from '../../redux/reducers/paymentSlice';
import 'react-toastify/dist/ReactToastify.css';

const CashOnDelivery = () => {
  const dispatch = useDispatch();
  const orderIdFromResponse = Number(localStorage.getItem('orderId'));
  const initialTotalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0; // Get totalPrice from local storage

  const [termsAndConditionsChecked, setTermsAndConditionsChecked] = useState(false);
  const [privacyPolicyChecked, setPrivacyPolicyChecked] = useState(false);
  const [totalPrice, setTotalPrice] = useState(initialTotalPrice);

  useEffect(() => {
    setTotalPrice(initialTotalPrice);
  }, [initialTotalPrice]);

  const handleTermsAndConditionsChange = () => {
    setTermsAndConditionsChecked(!termsAndConditionsChecked);
  };

  const handlePrivacyPolicyChange = () => {
    setPrivacyPolicyChecked(!privacyPolicyChecked);
  };

  const handlePayment = async () => {
    // Check if terms and conditions and privacy policy are agreed
    if (!termsAndConditionsChecked || !privacyPolicyChecked) {
      toast.error('Please agree to Terms and Conditions and Privacy Policy.');
      return;
    }

    // Check if the payable amount is greater than 0
    if (totalPrice === 0) {
      toast.error('Cannot process payment for $0.00');
      return;
    }

    // Simulating API call
    try {
      const response = await dispatch(
        makePayment({
          paymentType: 'CASH_ON_DELIVERY',
          amount: totalPrice,
          orderId: orderIdFromResponse,
          accountName: null,
          password: null,
        }),
      );
      console.log('Cash on Delivery Payment Successful:', response);
      setTotalPrice(0); // Set totalPrice to 0 after payment
      // Show success message
      toast.success('Payment placed on Cash on Delivery successful.');
      localStorage.removeItem('totalPrice');
    } catch (error) {
      console.error('Error making Cash on Delivery Payment:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border-2 border-gray-300 rounded-lg shadow-md text-gray-800 w-full">
      <h2 className="text-2xl font-bold mb-4">Cash on Delivery</h2>
      <p className="mb-4">
        Thank you for choosing Cash on Delivery! We appreciate your order.
        Please review and agree to the following terms before confirming your
        order.
      </p>
      <p className="mb-4">
        By checking the boxes below, you confirm that you have read and agree to
        our Terms and Conditions and Privacy Policy. Once you confirm, an email
        will be sent to you with the details of your order. Please be ready to
        pay the total amount in cash upon delivery at your doorstep.
      </p>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="termsAndConditions"
              className="mr-2"
              checked={termsAndConditionsChecked}
              onChange={handleTermsAndConditionsChange}
            />
            <label htmlFor="termsAndConditions" className="text-sm">
              I agree to the Terms and Conditions
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="privacyPolicy"
              className="mr-2"
              checked={privacyPolicyChecked}
              onChange={handlePrivacyPolicyChange}
            />
            <label htmlFor="privacyPolicy" className="text-sm">
              I agree to the Privacy Policy
            </label>
          </div>
        </div>
        <div className="mb-4">
          <span className="text-lg font-semibold">
            Payable: $
            {totalPrice.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <button
            type="button"
            onClick={handlePayment}
            className="btn-primary bg-gray-800 hover:bg-red-500 text-red-500 hover:text-white py-2 px-4 rounded-full"
            disabled={totalPrice === 0}
          >
            Confirm
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CashOnDelivery;
