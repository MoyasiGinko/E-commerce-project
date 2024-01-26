import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'; // Import the trash icon
import backgroundImage from '../assets/images/bg-ecom-4.jpg'; // Import the background image

const ShowReservation = () => {
  const [localCart, setLocalCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setLocalCart(storedCart);
  }, []);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = localCart.filter((trade) => trade.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setLocalCart(updatedCart);

    // Notify the user that the item has been removed
    toast.success('Item removed from the cart!');
  };

  if (localCart.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-gray-500">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div
      className="container mx-auto p-4 h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <ToastContainer />
      <h1 className="text-3xl flex justify-center font-bold text-gray-500 mb-4">
        Shopping Cart
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {localCart.map((trade) => (
          <div
            key={trade.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer relative"
          >
            <Link
              key={trade.id}
              to={`/trade/${trade.id}`}
              className="cursor-pointer"
            >
              <div
                className="bg-cover bg-center bg-no-repeat h-48 transition-all duration-300"
                style={{ backgroundImage: `url(${trade.imageURL})` }}
              />
            </Link>
            <div className="p-4 flex flex-col">
              <h2 className="text-lg font-semibold mb-2">{trade.name}</h2>
              <p className="text-sm text-gray-500 mb-2">
                {trade.category.type}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Quantity:
                {' '}
                {trade.orderQuantity}
              </p>
              <div className="flex justify-between items-center mt-auto">
                {/* <button
                  type="button"
                  onClick={() => handleRemoveFromCart(trade.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-full text-sm hover:bg-red-600"
                >
                  Remove
                </button> */}
                <p className="text-lg font-bold text-red-600 mb-2">
                  <span>$</span>
                  {trade.price * trade.orderQuantity}
                </p>
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className="text-red-500 text-lg cursor-pointer hover:text-red-600"
                  onClick={() => handleRemoveFromCart(trade.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center items-center mt-4">
        <Link
          to="/trade/checkout"
          className="btn-primary text-yellow-500 bg-gray-500 hover:bg-yellow-500 font-bold hover:text-white py-2 px-4 rounded-full"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default ShowReservation;
