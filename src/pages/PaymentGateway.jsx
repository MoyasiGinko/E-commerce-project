import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCreditCard,
  faMoneyBillAlt,
} from '@fortawesome/free-solid-svg-icons';
import PaypalPayment from '../components/payment/PaypalPayment';
import CashOnDelivery from '../components/payment/CashOnDelivery';
import backgroundImage from '../assets/images/bg-admin-2.jpg';

const PaymentGateway = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('paypal');
  const [totalPrice, setTotalPrice] = useState(0);
  const [renderPaypalButtons, setRenderPaypalButtons] = useState(true);

  useEffect(() => {
    const initialTotalPrice =
      parseFloat(localStorage.getItem('totalPrice')) || 0;
    setTotalPrice(initialTotalPrice);

    const handleStorageChange = (event) => {
      if (event.key === 'totalPrice') {
        setTotalPrice(parseFloat(event.newValue) || 0);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    setRenderPaypalButtons(selectedPaymentMethod === 'paypal');
  }, [selectedPaymentMethod]);

  return (
    <div
      className="flex items-center justify-center h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="max-w-md bg-white border-2 border-gray-300 rounded-lg shadow-md p-6 text-gray-800">
        <h2 className="text-2xl font-bold mb-4">Payment Gateway</h2>
        <p className="text-sm mb-4">
          Thank you for choosing us! Whether you prefer the ease of card
          payment, the speed of PayPal, or the convenience of Cash on Delivery,
          we have got you covered for a smooth and secure shopping experience.
        </p>
        <div className="mb-4">
          <span className="block text-sm font-semibold mb-2">
            Select Payment Method:
          </span>
          <div className="flex space-x-4 items-center">
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={selectedPaymentMethod === 'paypal'}
                onChange={() => setSelectedPaymentMethod('paypal')}
              />
              <span className="ml-2 flex items-center">
                <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
                Digital Payment
              </span>
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="cashOnDelivery"
                checked={selectedPaymentMethod === 'cashOnDelivery'}
                onChange={() => setSelectedPaymentMethod('cashOnDelivery')}
              />
              <span className="ml-2 flex items-center">
                <FontAwesomeIcon icon={faMoneyBillAlt} className="mr-2" />
                Cash on Delivery
              </span>
            </label>
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
      </div>
    </div>
  );
};

export default PaymentGateway;
