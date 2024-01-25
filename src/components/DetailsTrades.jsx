import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { fetchTradeDetails } from '../redux/reducers/tradeDetailsSlice';
import loadingImage from '../assets/images/loading.gif';
import Recommendation from './Recommendation';
import 'react-toastify/dist/ReactToastify.css';
import { getUserRole } from '../utils/userStorage';

const TradesDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const trade = useSelector((state) => state.tradeDetails.trade);
  const userRole = getUserRole();
  // State to manage the order quantity
  const [orderQuantity, setOrderQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchTradeDetails(id));
  }, [dispatch, id]);

  const handleOrderQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10) || 1;
    setOrderQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    const availableQuantity = trade.quantity || 0;

    if (orderQuantity <= 0 || orderQuantity > availableQuantity) {
      toast.error(
        `Invalid quantity. Please enter a quantity between 1 and ${availableQuantity}.`,
      );
      return;
    }

    // Get the existing cart from local storage or an empty array if not present
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingTradeIndex = existingCart.findIndex(
      (item) => item.id === trade.id,
    );

    if (existingTradeIndex !== -1) {
      // If trade is already in the cart, calculate the remaining quantity that can be added
      const remainingQuantity = availableQuantity - existingCart[existingTradeIndex].orderQuantity;

      if (orderQuantity > remainingQuantity) {
        toast.error(
          `Cannot add more than ${remainingQuantity} items due to limited stock.`,
        );
        return;
      }

      // Update the quantity in the cart
      existingCart[existingTradeIndex].orderQuantity += orderQuantity;
      toast.success('Quantity updated in the cart!');
    } else {
      // If trade is not in the cart, add it with the selected quantity
      const newTrade = {
        ...trade,
        orderQuantity: Math.min(orderQuantity, availableQuantity),
      };
      existingCart.push(newTrade);
      toast.success('Trade added to cart!');
    }

    // Update local storage with the modified cart
    localStorage.setItem('cart', JSON.stringify(existingCart));
  };

  if (!trade) {
    return (
      <div className="text-center mt-4">
        <img src={loadingImage} alt="Loading..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-merriweather">
      <ToastContainer />
      <div className="max-w-screen-2xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow-md">
          <div className="md:col-span-1">
            <img
              src={trade.imageURL}
              alt={trade.name}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="md:col-span-1 p-6">
            <h2 className="text-4xl font-semibold text-gray-800 mb-4">
              {trade.name}
            </h2>
            <p className="text-gray-700 text-lg mb-2">
              <strong>Description:</strong>
              {' '}
              {trade.details}
            </p>
            <p className="text-gray-700 text-lg mb-2">
              <strong>Brand:</strong>
              {' '}
              {trade.brand}
            </p>
            <p className="text-gray-700 text-lg mb-2">
              <strong>Price:</strong>
              {' '}
              $
              {trade.price}
            </p>
            <p className="text-gray-700 text-lg mb-2">
              <strong>Quantity:</strong>
              {' '}
              {trade.quantity}
            </p>
            <p className="text-gray-700 text-lg mb-2">
              <strong>Category:</strong>
              {' '}
              {trade.category.name}
            </p>
            <div className="mt-6 flex items-center">
              {/* Conditionally render the quantity input and "Add to Cart" button based on user role */}
              {userRole !== 'VENDOR' && (
                <>
                  <span htmlFor="orderQuantity" className="text-gray-700">
                    Quantity:
                  </span>
                  <input
                    type="number"
                    id="orderQuantity"
                    value={orderQuantity}
                    onChange={handleOrderQuantityChange}
                    className="w-16 p-2 border rounded"
                    min="1"
                    max={trade.quantity || ''}
                  />
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3
                        rounded-full transition-colors duration-300 text-lg font-semibold inline-block ml-4"
                  >
                    <span className="mr-2">&#128722;</span>
                    Add to Cart
                  </button>
                </>
              )}
            </div>
            {userRole !== 'CUSTOMER' && userRole !== 'ADMIN' && (
              <div className="mt-4 flex items-center">
                <Link
                  to={`/trade/edit-product/${trade.id}`}
                  className="bg-gray-500 text-white py-2 px-4 rounded font-bold hover:bg-red-600 focus:outline-none transition duration-300 inline-block"
                >
                  <span className="text-xl">&#9998;</span>
                </Link>
                {/* <Link
                  to={`/trade/edit-product/${trade.id}`}
                  className="ml-2 text-blue-500 hover:text-blue-600"
                >
                  <span className="text-2xl">&#9998;</span>
                </Link> */}
              </div>
            )}
          </div>
        </div>
        <div className="md:col-span-1 p-6">
          {/* ... (your existing details content) ... */}
          <Recommendation />
        </div>
      </div>
    </div>
  );
};

export default TradesDetails;
