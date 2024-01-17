import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

/*eslint-disable*/
const CardPayment = ({
  handleSubmit,
  cardNumber,
  expiryDate,
  cvv,
  handleCardNumberChange,
  handleExpiryDateChange,
  handleCvvChange,
  totalPrice,
}) => {
  const isCardNumberValid = cardNumber.replace(/\D/g, '').length === 16;
  const isExpiryDateValid = /^\d{2}\/\d{2}$/.test(expiryDate);
  const isCvvValid = /^\d{3}$/.test(cvv);

  const isFormValid = isCardNumberValid && isExpiryDateValid && isCvvValid;

  return (
    <div className="max-w-md mx-auto p-6 bg-red-300 border-2 border-gray-300 rounded-lg shadow-md text-gray-800 w-full">
      <h2 className="text-2xl font-bold mb-4">Card Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
          <span className="block text-sm font-semibold mb-2">Card Number:</span>
          <input
            type="text"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1234 XXXX 9012 XXXX"
            className={`input-field w-full border-2 border-gray-400 rounded-full px-4 py-2 ${
              isCardNumberValid ? 'border-green-500' : 'border-gray-500'
            }`}
          />
          {!isCardNumberValid && (
            <p className="text-gray-500 text-sm">Enter card number</p>
          )}
        </div>

        <div className="mb-4">
          <span className="block text-sm font-semibold mb-2">Expiry Date:</span>
          <input
            type="text"
            value={expiryDate}
            onChange={handleExpiryDateChange}
            placeholder="MM/YY"
            className={`input-field w-full border-2 border-gray-400 rounded-full px-4 py-2 ${
              isExpiryDateValid ? 'border-green-500' : 'border-gray-500'
            }`}
          />
          {!isExpiryDateValid && (
            <p className="text-gray-500 text-sm">Enter expiry date</p>
          )}
        </div>

        <div className="mb-4">
          <span className="block text-sm font-semibold mb-2">CVV:</span>
          <input
            type="text"
            value={cvv}
            onChange={handleCvvChange}
            placeholder="123"
            className={`input-field w-full border-2 border-gray-400 rounded-full px-4 py-2 ${
              isCvvValid ? 'border-green-500' : 'border-gray-500'
            }`}
          />
          {!isCvvValid && <p className="text-gray-500 text-sm">Enter CVV</p>}
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">
            Payable: $
            {totalPrice.toFixed(2)}
          </span>
          <button
            type="submit"
            disabled={!isFormValid}
            className={`btn-primary ${
              isFormValid
                ? 'bg-gray-800 hover:bg-red-500'
                : 'bg-gray-400 cursor-not-allowed'
            } text-red-500 hover:text-white py-2 px-4 rounded-full`}
          >
            Pay Now
          </button>
        </div>
      </form>
    </div>
  );
};

const PaypalPayment = () => (
  <div className="max-w-md mx-auto p-6 bg-white border-2 border-gray-300 rounded-lg shadow-md text-gray-800 w-full">
    <h2 className="text-2xl font-bold mb-4">PayPal Payment</h2>
    {/* Your PayPal specific UI goes here */}
    <div>PayPal Payment UI</div>
  </div>
);

const CashOnDelivery = ({ handleSubmit }) => {
  const [termsAndConditionsChecked, setTermsAndConditionsChecked] = useState(false);
  const [privacyPolicyChecked, setPrivacyPolicyChecked] = useState(false);

  const handleTermsAndConditionsChange = () => {
    setTermsAndConditionsChecked(!termsAndConditionsChecked);
  };

  const handlePrivacyPolicyChange = () => {
    setPrivacyPolicyChecked(!privacyPolicyChecked);
  };

  const isFormValid = termsAndConditionsChecked && privacyPolicyChecked;

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
      <form onSubmit={handleSubmit}>
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

          <button
            type="submit"
            disabled={!isFormValid}
            className={`btn-primary ${
              isFormValid
                ? 'bg-gray-800 hover:bg-red-500'
                : 'bg-gray-400 cursor-not-allowed'
            } text-red-500 hover:text-white py-2 px-4 rounded-full`}
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

const PaymentGateway = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || 0;

  useEffect(() => {
    // You can use useEffect for any side effects or initialization if needed
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

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check the selected payment method
    switch (selectedPaymentMethod) {
      case 'cashOnDelivery': {
        // Check if both checkboxes are checked
        const termsAndConditionsChecked = document.getElementById('termsAndConditions').checked;
        const privacyPolicyChecked = document.getElementById('privacyPolicy').checked;

        if (!termsAndConditionsChecked || !privacyPolicyChecked) {
          console.log(
            'Please agree to both Terms and Conditions and Privacy Policy.',
          );
          return; // Prevent form submission
        }

        console.log('Processing Cash on Delivery...');
        break;
      }
      case 'paypal':
        console.log('Processing PayPal payment...');
        break;
      case 'cardPayment':
        // Check if card details are filled
        if (!cardNumber.trim() || !expiryDate.trim() || !cvv.trim()) {
          console.log('Please fill in all card details.');
          return; // Prevent form submission
        }

        console.log('Processing Card payment...');
        break;
      default:
        console.log('No payment method selected');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white border-2 border-gray-300 rounded-lg shadow-md text-gray-800 w-full">
      <h2 className="text-2xl font-bold text mb-4">Payment Gateway</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
              onChange={() => handlePaymentMethodChange('cashOnDelivery')}
            />
            <span className="ml-2">Cash on Delivery</span>

            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              onChange={() => handlePaymentMethodChange('paypal')}
            />
            <span className="ml-2">PayPal</span>

            <input
              type="radio"
              name="paymentMethod"
              value="cardPayment"
              onChange={() => handlePaymentMethodChange('cardPayment')}
            />
            <span className="ml-2">Card Payment</span>
          </div>
        </div>

        {/* Conditionally render different displays based on the selected payment method */}
        {selectedPaymentMethod === 'cardPayment' && (
          <CardPayment
            handleSubmit={handleSubmit}
            cardNumber={cardNumber}
            expiryDate={expiryDate}
            cvv={cvv}
            handleCardNumberChange={handleCardNumberChange}
            handleExpiryDateChange={handleExpiryDateChange}
            handleCvvChange={handleCvvChange}
            totalPrice={totalPrice}
          />
        )}
        {selectedPaymentMethod === 'paypal' && <PaypalPayment />}
        {selectedPaymentMethod === 'cashOnDelivery' && <CashOnDelivery />}

        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">
            Total Amount: $
            {totalPrice.toFixed(2)}
          </span>
        </div>
      </form>
    </div>
  );
};

export default PaymentGateway;

CardPayment.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  cardNumber: PropTypes.string.isRequired,
  expiryDate: PropTypes.string.isRequired,
  cvv: PropTypes.string.isRequired,
  handleCardNumberChange: PropTypes.func.isRequired,
  handleExpiryDateChange: PropTypes.func.isRequired,
  handleCvvChange: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired,
};

CashOnDelivery.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};
