// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import PropTypes from 'prop-types';
// import { toast, ToastContainer } from 'react-toastify';
// import { makePayment } from '../../redux/reducers/paymentSlice';
// import 'react-toastify/dist/ReactToastify.css';

// const CardPayment = ({
//   cardNumber,
//   expiryDate,
//   cvv,
//   handleCardNumberChange,
//   handleExpiryDateChange,
//   handleCvvChange,
//   setTotalPrice, // Pass the setTotalPrice function
// }) => {
//   const dispatch = useDispatch();
//   const orderIdFromResponse = Number(localStorage.getItem('orderId'));

//   const [totalPrice, setLocalTotalPrice] = useState(0); // Local state for totalPrice

//   useEffect(() => {
//     // Set the local state of totalPrice based on local storage
//     const initialTotalPrice = parseFloat(localStorage.getItem('totalPrice')) || 0;
//     setLocalTotalPrice(initialTotalPrice);
//   }, []); // Empty dependency array to run only once on mount

//   const isCardNumberValid = cardNumber.replace(/\D/g, '').length === 16;
//   const isExpiryDateValid = /^\d{2}\/\d{2}$/.test(expiryDate);
//   const isCvvValid = /^\d{3}$/.test(cvv);

//   const isFormValid = isCardNumberValid && isExpiryDateValid && isCvvValid;

//   const [accountName, setAccountName] = useState('');

//   const handlePayment = async () => {
//     if (totalPrice === 0) {
//       toast.warning('Pay after you have something to pay');
//       return;
//     }

//     try {
//       const response = await dispatch(
//         makePayment({
//           paymentType: 'CARD',
//           amount: totalPrice,
//           orderId: orderIdFromResponse,
//           accountName,
//           password: null,
//         }),
//       );
//       console.log('Card Payment Successful:', response);
//       setLocalTotalPrice(0); // Set local totalPrice to 0 after payment
//       setTotalPrice(0); // Call the prop function to set totalPrice in the parent component
//       toast.success('Card Payment Successful');

//       // Remove totalPrice from local storage after successful payment
//       localStorage.removeItem('totalPrice');
//     } catch (error) {
//       console.error('Error making Card Payment:', error);
//       toast.error('Error making Card Payment');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-red-300 border-2
// border - gray - 300 rounded - lg shadow - md text - gray - 800 w - full">
//       <h2 className="text-2xl font-bold mb-4">Card Payment</h2>
//       <ToastContainer
//         position="top-right"
//         autoClose={5000}
//         hideProgressBar={false}
//       />
//       <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
//         <div className="mb-4">
//           <label
//             htmlFor="cardNumber"
//             className="block text-sm font-semibold mb-2"
//           >
//             Card Number:
//           </label>
//           <input
//             type="text"
//             id="cardNumber"
//             value={cardNumber}
//             onChange={handleCardNumberChange}
//             placeholder="1234 XXXX 9012 XXXX"
//             className={`input-field w-full border-2 border-gray-400 rounded-full px-4 py-2 ${
//               isCardNumberValid ? 'border-green-500' : 'border-gray-500'
//             }`}
//           />
//           {!isCardNumberValid && (
//             <p className="text-gray-500 text-sm">Enter a valid card number</p>
//           )}
//         </div>

//         <div className="mb-4">
//           <label
//             htmlFor="expiryDate"
//             className="block text-sm font-semibold mb-2"
//           >
//             Expiry Date:
//           </label>
//           <input
//             type="text"
//             id="expiryDate"
//             value={expiryDate}
//             onChange={handleExpiryDateChange}
//             placeholder="MM/YY"
//             className={`input-field w-full border-2 border-gray-400 rounded-full px-4 py-2 ${
//               isExpiryDateValid ? 'border-green-500' : 'border-gray-500'
//             }`}
//           />
//           {!isExpiryDateValid && (
//             <p className="text-gray-500 text-sm">Enter a valid expiry date</p>
//           )}
//         </div>

//         <div className="mb-4">
//           <label htmlFor="cvv" className="block text-sm font-semibold mb-2">
//             CVV:
//           </label>
//           <input
//             type="text"
//             id="cvv"
//             value={cvv}
//             onChange={handleCvvChange}
//             placeholder="123"
//             className={`input-field w-full border-2 border-gray-400 rounded-full px-4 py-2 ${
//               isCvvValid ? 'border-green-500' : 'border-gray-500'
//             }`}
//           />
//           {!isCvvValid && (
//             <p className="text-gray-500 text-sm">Enter a valid CVV</p>
//           )}
//         </div>

//         {/* New input field for account name */}
//         <div className="mb-4">
//           <label
//             htmlFor="accountName"
//             className="block text-sm font-semibold mb-2"
//           >
//             Account Name:
//           </label>
//           <input
//             type="text"
//             id="accountName"
//             value={accountName}
//             onChange={(e) => setAccountName(e.target.value)}
//             placeholder="Your Account Name"
//             className="input-field w-full border-2 border-gray-400 rounded-full px-4 py-2"
//           />
//         </div>

//         <div className="flex justify-between items-center mb-4">
//           <span className="text-lg font-semibold">
//             Payable: $
//             {totalPrice.toFixed(2)}
//           </span>
//           <button
//             type="button"
//             onClick={handlePayment}
//             disabled={!isFormValid || totalPrice === 0}
//             className={`btn-primary ${
//               isFormValid && totalPrice > 0
//                 ? 'bg-gray-800 hover:bg-red-500'
//                 : 'bg-gray-400 cursor-not-allowed'
//             } text-red-500 hover:text-white py-2 px-4 rounded-full`}
//           >
//             Pay Now
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// CardPayment.propTypes = {
//   cardNumber: PropTypes.string.isRequired,
//   expiryDate: PropTypes.string.isRequired,
//   cvv: PropTypes.string.isRequired,
//   handleCardNumberChange: PropTypes.func.isRequired,
//   handleExpiryDateChange: PropTypes.func.isRequired,
//   handleCvvChange: PropTypes.func.isRequired,
//   setTotalPrice: PropTypes.func.isRequired,
// };

// export default CardPayment;
