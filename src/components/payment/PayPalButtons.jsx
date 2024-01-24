import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalButton = ({ onApprove, onError }) => (
  <PayPalScriptProvider
    options={{ 'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID }}
  >
    <PayPalButtons
      onApprove={(data, actions) => onApprove(data, actions)}
      onError={(err) => onError(err)}
    />
  </PayPalScriptProvider>
);

export default PayPalButton;
