import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchReservations } from '../redux/reducers/rservationSlice';
import loadingImage from '../assets/images/loading.gif';

const Checkout = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

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

  const itemsInCheckout = reservations.map((reservation) => ({
    name: reservation.trade.name,
    price: reservation.trade.price,
  }));

  const totalPrice = itemsInCheckout.reduce(
    (total, item) => total + Math.round(item.price * 100) / 100,
    0,
  );

  const isFormValid = firstName && lastName && email && address && city && zipCode && phoneNumber;

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-screen-md mx-auto p-6 bg-white border border-gray-300 rounded-lg shadow-md text-gray-800 w-full">
        <h1 className="text-3xl font-semibold mb-4">Checkout</h1>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input-field border border-gray-300 rounded-md px-4 py-2 w-full"
              />
            </div>

            <div className="col-span-1">
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input-field border border-gray-300 rounded-md px-4 py-2 w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field border border-gray-300 rounded-md px-4 py-2 w-full"
              />
            </div>

            <div className="col-span-1">
              <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="input-field border border-gray-300 rounded-md px-4 py-2 w-full"
              />
            </div>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="input-field border border-gray-300 rounded-md px-4 py-2 w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <input
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="input-field border border-gray-300 rounded-md px-4 py-2 w-full"
              />
            </div>

            <div className="col-span-1">
              <input
                type="text"
                placeholder="Zip Code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="input-field border border-gray-300 rounded-md px-4 py-2 w-full"
              />
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">
              Items in Your Order (
              {itemsInCheckout.length}
              ):
            </h2>
            <ul className="list-disc pl-4">
              {itemsInCheckout.map((item) => (
                <li key={item.id} className="flex justify-between items-center">
                  <span>{item.name}</span>
                  <span className="font-semibold">
                    $
                    {item.price}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t-2 border-gray-300 pt-4 mt-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold mb-2">
                  Order Total: $
                  {totalPrice.toFixed(2)}
                </h2>
              </div>
              <button
                type="submit"
                onClick={() => navigate('/trade/payment-gateway', { state: { totalPrice } })}
                disabled={!isFormValid}
                className={`btn-primary ${
                  isFormValid
                    ? 'bg-yellow-400 hover:bg-yellow-500'
                    : 'bg-gray-400 cursor-not-allowed'
                } text-white py-2 px-4 rounded-md`}
              >
                Place Your Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
