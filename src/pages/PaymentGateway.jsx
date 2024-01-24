import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { makePayment } from '../redux/reducers/paymentSlice';

const CardPayment = ({
  cardNumber,
  expiryDate,
  cvv,
  handleCardNumberChange,
  handleExpiryDateChange,
  handleCvvChange,
  totalPrice,
  setTotalPrice,
}) => {
  const dispatch = useDispatch();
  const orderIdFromResponse = Number(localStorage.getItem('orderId')); // Get orderId from local storage

  const isCardNumberValid = cardNumber.replace(/\D/g, '').length === 16;
  const isExpiryDateValid = /^\d{2}\/\d{2}$/.test(expiryDate);
  const isCvvValid = /^\d{3}$/.test(cvv);

  const isFormValid = isCardNumberValid && isExpiryDateValid && isCvvValid;

  const [accountName, setAccountName] = useState('');
  // const [password, setPassword] = useState('');
  const pass = null; // New state for password
  const handlePayment = async () => {
    // Simulating API call
    try {
      const response = await dispatch(
        makePayment({
          paymentType: 'CARD',
          amount: totalPrice,
          orderId: orderIdFromResponse,
          accountName,
          password: pass,
          card: {
            cardNumber,
            expiryDate,
            cvv,
          },
        }),
      );
      console.log('Card Payment Successful:', response);
      setTotalPrice(0); // Set totalPrice to 0 after payment
    } catch (error) {
      console.error('Error making Card Payment:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-red-300 border-2 border-gray-300 rounded-lg shadow-md text-gray-800 w-full">
      <h2 className="text-2xl font-bold mb-4">Card Payment</h2>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
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
            <p className="text-gray-500 text-sm">Enter valid card number</p>
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
            <p className="text-gray-500 text-sm">Enter valid expiry date</p>
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
          {!isCvvValid && (
            <p className="text-gray-500 text-sm">Enter valid CVV</p>
          )}
        </div>

        {/* New input field for account name */}
        <div className="mb-4">
          <span className="block text-sm font-semibold mb-2">
            Account Name:
          </span>
          <input
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            placeholder="Your Account Name"
            className="input-field w-full border-2 border-gray-400 rounded-full px-4 py-2"
          />
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">
            Payable: $
            {totalPrice.toFixed(2)}
          </span>
          <button
            type="button" // Change type to button
            onClick={handlePayment} // Call handlePayment on button click
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

const PaypalPayment = ({ totalPrice, setTotalPrice }) => {
  const dispatch = useDispatch();
  const orderIdFromResponse = Number(localStorage.getItem('orderId')); // Get orderId from local storage

  const [accountName, setAccountName] = useState('');
  const [password, setPassword] = useState('');

  const handlePayment = async () => {
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
      console.log('orderIdFromResponse:', orderIdFromResponse);
      setTotalPrice(0); // Set totalPrice to 0 after payment
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
            className="btn-primary bg-gray-800 hover:bg-red-500 text-red-500 hover:text-white py-2 px-4 rounded-full focus:outline-none"
          >
            Pay Now
          </button>
        </div>
      </form>
    </div>
  );
};

const CashOnDelivery = ({ totalPrice, setTotalPrice }) => {
  const dispatch = useDispatch();
  const orderIdFromResponse = Number(localStorage.getItem('orderId')); // Get orderId from local storage

  const [termsAndConditionsChecked, setTermsAndConditionsChecked] = useState(false);
  const [privacyPolicyChecked, setPrivacyPolicyChecked] = useState(false);

  const handleTermsAndConditionsChange = () => {
    setTermsAndConditionsChecked(!termsAndConditionsChecked);
  };

  const handlePrivacyPolicyChange = () => {
    setPrivacyPolicyChecked(!privacyPolicyChecked);
  };

  const handlePayment = async () => {
    // Check if terms and conditions and privacy policy are agreed
    if (!termsAndConditionsChecked || !privacyPolicyChecked) {
      console.log('Please agree to Terms and Conditions and Privacy Policy.');
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
  const [totalPrice, setTotalPrice] = useState(0); // Initialize totalPrice state
  const location = useLocation();
  // const dispatch = useDispatch();

  useEffect(() => {
    // Get total price from location state
    const initialTotalPrice = location.state?.totalPrice || 0;
    setTotalPrice(initialTotalPrice);
  }, [location.state]);

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleExpiryDateChange = (e) => {
    setExpiryDate(e.target.value);
  };

  const handleCvvChange = (e) => {
    setCvv(e.target.value);
  };

  // const handleSubmit = async (e, paymentCallback) => {
  //   e.preventDefault();

  //   // Check the selected payment method
  //   switch (selectedPaymentMethod) {
  //     case 'cashOnDelivery':
  //       // Simulating API call
  //       paymentCallback();
  //       break;
  //     case 'paypal':
  //       // Simulating API call
  //       paymentCallback();
  //       break;
  //     case 'cardPayment':
  //       // Check if card details are filled
  //       if (!cardNumber.trim() || !expiryDate.trim() || !cvv.trim()) {
  //         console.log('Please fill in all card details.');
  //         return; // Prevent form submission
  //       }
  //       // Simulating API call
  //       paymentCallback();
  //       break;
  //     default:
  //       console.log('No payment method selected');
  //   }
  // };

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

        {/* Conditionally render different displays based on the selected payment method */}
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

        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">
            Total Amount: $
            {totalPrice.toFixed(2)}
          </span>
          {/* <button
            type="button"
            onClick={
              (e) => handleSubmit(e, () => setTotalPrice(0)) // Set totalPrice to 0 after payment
            }
            className="btn-primary bg-gray-800
            hover:bg-red-500 text-red-500 hover:text-white py-2 px-4 rounded-full"
          >
            Done
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default PaymentGateway;

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
