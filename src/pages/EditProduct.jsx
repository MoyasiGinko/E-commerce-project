/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTrades } from '../redux/reducers/tradesSlice';
import { getUserId } from '../utils/userStorage';

const EditProduct = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const trades = useSelector((state) => state.trades.trades);
  const userId = getUserId();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchTrades());
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trades:', error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredTrades = trades.filter((trade) => trade.vendorId === userId);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4">
      {filteredTrades.map((trade) => (
        <div
          key={trade.id}
          className="border p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
        >
          <Link to={`/trade/${trade.id}`} className="block mb-4">
            <img
              src={trade.imageURL}
              alt={trade.name}
              className="w-full h-40 object-cover rounded-md"
            />
          </Link>
          <h2 className="text-xl font-semibold mb-2">{trade.name}</h2>
          <p className="text-gray-500 mb-2">{`${trade.category.name}`}</p>
          <p className="text-red-500 font-bold mb-2">{`$${trade.price}`}</p>
          <Link
            to={`/trade/edit-product/${trade.id}`}
            className="bg-gray-500 text-white py-2 px-4 rounded font-bold hover:bg-red-600 focus:outline-none transition duration-300 inline-block"
          >
            <span className="text-xl">&#9998;</span>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default EditProduct;
