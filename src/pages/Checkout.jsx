import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchReservations } from '../redux/reducers/rservationSlice';
import loadingImage from '../assets/images/loading.gif';
// import PaymentGateway from './PaymentGateway';

/*eslint-disable */
const Checkout = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [itemPrices, setItemPrices] = useState([10, 20, 15]); // Example prices for each item

  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservations.reservations);
  const loading = useSelector((state) => state.reservations.loading);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center mt-4">
        <img src={loadingImage} alt="Loading..." />
      </div>
    );
  }

  // List of items being checked out
  const itemsInCheckout = reservations.map((reservation) => ({
    name: reservation.trade.name,
    price: reservation.trade.price, // Replace with the actual price property of your item
  }));

  // Calculate the total price dynamically
  const totalPrice = itemsInCheckout.reduce(
    (total, item) => total + Math.round(item.price * 100) / 100, // Round to 2 decimal places
    0,
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic for handling the checkout form submission
    // You can send the form data, itemsInCheckout, etc., to your server
    // ...

    // For example, navigate to a thank you page after successful checkout
    navigate('/payment-gateway');
  };

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md mx-auto p-6 bg-white border-2 border-gray-300 rounded-lg shadow-md text-gray-800 w-full">
        <h1 className="text-4xl font-bold mb-4">Place your order</h1>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input-field border-2 border-gray-400 rounded-full px-4 py-2 col-span-1"
            />

            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input-field border-2 border-gray-400 rounded-full px-4 py-2 col-span-1"
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field w-full border-2 border-gray-400 rounded-full px-4 py-2"
          />

          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="input-field w-full border-2 border-gray-400 rounded-full px-4 py-2"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="input-field border-2 border-gray-400 rounded-full px-4 py-2 col-span-1"
            />

            <input
              type="text"
              placeholder="Zip Code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="input-field border-2 border-gray-400 rounded-full px-4 py-2 col-span-1"
            />
          </div>

          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="input-field w-full border-2 border-gray-400 rounded-full px-4 py-2"
          />

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">
              Items in Checkout ({itemsInCheckout.length}
              ):
            </h2>
            <ul className="list-disc pl-4">
              {itemsInCheckout.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t-2 border-gray-400 pt-4 mt-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold mb-2">
                  Total Price: ${totalPrice}
                </h2>
              </div>
              <button
                type="submit"
                onClick={() =>
                  navigate('/trade/payment-gateway', { state: { totalPrice } })
                }
                className="btn-primary bg-gray-800 hover:bg-red-500 text-red-500 hover:text-white py-2 px-4 rounded-full"
              >
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
