import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import PaypalPayment from '../components/payment/PaypalPayment';
import CashOnDelivery from '../components/payment/CashOnDelivery';

const PaymentGateway = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [renderPaypalButtons, setRenderPaypalButtons] = useState(false);

  useEffect(() => {
    // Set the initial value of totalPrice from localStorage
    const initialTotalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;
    setTotalPrice(initialTotalPrice);

    // Add an event listener for storage changes
    const handleStorageChange = (event) => {
      if (event.key === 'totalPrice') {
        // Update the state when localStorage changes
        setTotalPrice(parseFloat(event.newValue) || 0);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    // Set renderPaypalButtons to true when "Digital Payment" is selected
    setRenderPaypalButtons(selectedPaymentMethod === 'paypal');
  }, [selectedPaymentMethod]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white border-2 border-gray-300 rounded-lg shadow-md text-gray-800 w-full">
      <h2 className="text-2xl font-bold text mb-4">Payment Gateway</h2>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <p className="text-sm mb-4">
          Thank you for choosing us! Whether you prefer the ease of card
          payment, the speed of PayPal, or the convenience of Cash on Delivery,
          we have got you covered for a smooth and secure shopping experience.
        </p>

        <div className="mb-4">
          <span className="block text-sm font-semibold mb-2">
            Select Payment Method:
          </span>
          <div className="flex space-x-4">
            <input
              type="radio"
              name="paymentMethod"
              value="cashOnDelivery"
              onChange={() => setSelectedPaymentMethod('cashOnDelivery')}
            />
            <span className="ml-2">Cash on Delivery</span>

            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              onChange={() => setSelectedPaymentMethod('paypal')}
            />
            <span className="ml-2">Digital Payment</span>
          </div>
        </div>
        {renderPaypalButtons && (
          <PaypalPayment
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
          />
        )}
        {selectedPaymentMethod === 'cashOnDelivery' && (
          <CashOnDelivery
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
          />
        )}
      </form>
    </div>
  );
};

export default PaymentGateway;
