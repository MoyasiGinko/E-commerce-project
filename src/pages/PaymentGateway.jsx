import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import PaypalPayment from '../components/payment/PaypalPayment';
import CashOnDelivery from '../components/payment/CashOnDelivery';
import CardPayment from '../components/payment/CardPayment';

const PaymentGateway = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

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

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleExpiryDateChange = (e) => {
    setExpiryDate(e.target.value);
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value);
  };

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
            <span className="ml-2">PayPal</span>

            <input
              type="radio"
              name="paymentMethod"
              value="cardPayment"
              onChange={() => setSelectedPaymentMethod('cardPayment')}
            />
            <span className="ml-2">Card Payment</span>
          </div>
        </div>

        {selectedPaymentMethod === 'cardPayment' && (
          <CardPayment
            cardNumber={cardNumber}
            expiryDate={expiryDate}
            cvv={cvv}
            handleCardNumberChange={handleCardNumberChange}
            handleExpiryDateChange={handleExpiryDateChange}
            handleCvvChange={handleCvvChange}
            totalPrice={totalPrice}
            setTotalPrice={setTotalPrice}
          />
        )}
        {selectedPaymentMethod === 'paypal' && (
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

// Prop types for your components remain the same as before

CardPayment.propTypes = {
  cardNumber: PropTypes.string.isRequired,
  expiryDate: PropTypes.string.isRequired,
  cvv: PropTypes.string.isRequired,
  handleCardNumberChange: PropTypes.func.isRequired,
  handleExpiryDateChange: PropTypes.func.isRequired,
  handleCvvChange: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired,
  setTotalPrice: PropTypes.func.isRequired,
};

PaypalPayment.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  setTotalPrice: PropTypes.func.isRequired,
};

CashOnDelivery.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  setTotalPrice: PropTypes.func.isRequired,
};
