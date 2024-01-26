// // PaypalButtons.js
// import React from 'react';
// import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
// import PropTypes from 'prop-types';

// const CustomPaypalButtons = ({ onApprove, onError, createOrder }) => (
//   <PayPalScriptProvider
//     options={{ 'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID }}
//   >
//     <PayPalButtons
//       createOrder={(data, actions) => createOrder(data, actions)}
//       onApprove={(data, actions) => onApprove(data, actions)}
//       onError={(err) => onError(err)}
//     />
//   </PayPalScriptProvider>
// );

// export default CustomPaypalButtons;

// PayPalButtons.propTypes = {
//   createOrder: PropTypes.func.isRequired,
//   onApprove: PropTypes.func.isRequired,
//   onError: PropTypes.func.isRequired,
// };
