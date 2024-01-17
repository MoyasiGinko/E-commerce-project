import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchReservations } from '../redux/reducers/rservationSlice';
import { cancelReservation } from '../redux/reducers/resereveSlice';
import loadingImage from '../assets/images/loading.gif';

const ShowReservation = () => {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.reservations.reservations);
  const msg = useSelector((state) => state.reserve.msg);
  const UnAmsg = useSelector((state) => state.reservations.msg);
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

  const handleCancelReservation = (reservationId) => {
    dispatch(cancelReservation(reservationId)).then(() => {
      dispatch(fetchReservations());
    });
  };

  const totalCount = reservations ? reservations.length : 0;

  return (
    <div className="container mx-auto p-4">
      {msg && <p className="text-green-600 text-center mt-4">{msg}</p>}
      {UnAmsg && <p className="text-red-600 text-center mt-4">{UnAmsg}</p>}
      <h1 className="text-3xl flex justify-center font-semibold text-gray-800 mb-4">
        Shopping Cart
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {reservations ? (
          reservations.map((reservation) => (
            <div
              key={reservation.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer relative"
            >
              <div
                className="bg-cover bg-center bg-no-repeat h-72 transition-all duration-300"
                style={{ backgroundImage: `url(${reservation.trade.image})` }}
              />
              <div className="p-6 flex flex-col">
                <h2 className="text-lg font-semibold mb-2">
                  {reservation.trade.name}
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                  {reservation.trade.trade_type}
                </p>
                <p className="text-lg font-semibold text-green-600 mb-2">
                  <span>$</span>
                  {reservation.trade.price}
                </p>
                <button
                  type="button"
                  onClick={() => handleCancelReservation(reservation.id)}
                  className="bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700 transition-colors duration-300 cursor-pointer self-start"
                >
                  Remove Item
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Loading lists...</p>
        )}
      </div>
      {/* Checkout button row */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="text-gray-700 text-lg">
            Total Items in Cart:
            {' '}
            {totalCount}
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/trade/checkout', { reservations })}
          className="btn-primary bg-yellow-500 hover:bg-yellow-600 text-white hover:text-white py-2 px-4 rounded-full"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default ShowReservation;
