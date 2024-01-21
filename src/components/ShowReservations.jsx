import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import loadingImage from '../assets/images/loading.gif';

const ShowReservation = () => {
  // State to manage the cart locally
  const [localCart, setLocalCart] = useState([]);

  useEffect(() => {
    // Load cart data from local storage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setLocalCart(storedCart);
  }, []);

  const handleRemoveFromCart = (productId) => {
    // Remove the specific product from the cart
    const updatedCart = localCart.filter((trade) => trade.id !== productId);

    // Update local storage with the modified cart
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Update the local state to re-render the component
    setLocalCart(updatedCart);
  };

  if (localCart.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-gray-500">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl flex justify-center font-semibold text-gray-800 mb-4">
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
                className="bg-cover bg-center bg-no-repeat h-72 transition-all duration-300"
                style={{ backgroundImage: `url(${trade.imageURL})` }}
              />
            </Link>
            <div className="p-6 flex flex-col">
              <h2 className="text-lg font-semibold mb-2">{trade.name}</h2>
              <p className="text-sm text-gray-500 mb-2">
                {trade.category.type}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Quantity: {trade.orderQuantity}
              </p>
              <p className="text-lg font-semibold text-green-600 mb-2">
                <span>Price: $</span>
                {trade.price * trade.orderQuantity}
              </p>
              {/* Remove button */}
              <button
                type="button"
                onClick={() => handleRemoveFromCart(trade.id)}
                className="bg-red-500 text-white py-1 px-3 rounded-full text-sm hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Checkout button row */}
      <div className="flex justify-center items-center mt-4">
        <Link
          to="/trade/checkout"
          className="btn-primary bg-yellow-500 hover:bg-yellow-600 text-white hover:text-white py-2 px-4 rounded-full"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default ShowReservation;
