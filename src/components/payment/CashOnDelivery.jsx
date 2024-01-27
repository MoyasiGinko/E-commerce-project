import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makePayment } from '../../redux/reducers/paymentSlice';

const CashOnDelivery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const orderIdFromResponse = Number(localStorage.getItem('orderId'));
  const initialTotalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;

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
    if (!termsAndConditionsChecked || !privacyPolicyChecked) {
      toast.error('Please agree to Terms and Conditions and Privacy Policy.');
      return;
    }

    if (totalPrice === 0) {
      toast.error('Cannot process payment for $0.00');
      return;
    }

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
      setTotalPrice(0);
      toast.success('Payment placed on Cash on Delivery successful.');
      localStorage.removeItem('totalPrice');
      navigate('/trade/payment-success'); // Redirect to the home page after successful payment
    } catch (error) {
      console.error('Error making Cash on Delivery Payment:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border-2 border-gray-500 bg-opacity-50 rounded-lg shadow-md text-gray-800 w-full">
      <h2 className="text-2xl font-bold mb-4">Cash on Delivery</h2>
      <p className="mb-4">
        Thank you for choosing Cash on Delivery! Please review and agree to the
        following terms before confirming your order.
      </p>
      <p className="mb-4">
        By checking the boxes below, you confirm that you have read and agree to
        our Terms and Conditions and Privacy Policy.
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
            <span htmlFor="termsAndConditions" className="text-sm">
              I agree to the Terms and Conditions
            </span>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="privacyPolicy"
              className="mr-2"
              checked={privacyPolicyChecked}
              onChange={handlePrivacyPolicyChange}
            />
            <span htmlFor="privacyPolicy" className="text-sm">
              I agree to the Privacy Policy
            </span>
          </div>
        </div>
        <div className="mb-4">
          <span className="text-lg text-red-600 font-bold">
            Payable: $
            {totalPrice.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <button
            type="button"
            onClick={handlePayment}
            className="btn-primary bg-gray-800 hover:bg-yellow-500 text-yellow-500 hover:text-white py-2 px-4 rounded-full"
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
