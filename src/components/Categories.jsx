// CategoryTrades.jsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchTradesForCategory,
  selectTradeType,
} from '../redux/reducers/categorySlice';

const CategoryTrades = () => {
  const dispatch = useDispatch();
  const {
    uniqueTradeTypes, loading, error, selectedTradeType, trades,
  } = useSelector((state) => state.category);

  const [selectedType, setSelectedType] = useState(selectedTradeType || '');

  useEffect(() => {
    // Fetch unique trade types and all products on component mount
    dispatch(fetchTradesForCategory());
  }, [dispatch]);

  // Render your component using the uniqueTradeTypes and filtered trades data
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <p>
        Error:
        {error}
      </p>
    );
  }

  const handleTradeTypeClick = () => {
    // Dispatch action to select trade type
    dispatch(selectTradeType(selectedType));
    console.log('Clicked trade type:', selectedType);

    // Fetch trades for the selected trade type
    dispatch(fetchTradesForCategory());
  };

  // Filter trades based on the selected trade type
  const filteredTrades = selectedTradeType
    ? trades.filter((trade) => trade.trade_type === selectedTradeType)
    : trades;

  return (
    <div className="container mx-auto p-4">
      {/* Render your component using the uniqueTradeTypes data */}
      <span htmlFor="tradeType" className="block mb-2 text-lg font-bold">
        Select a Category:
      </span>
      <select
        id="tradeType"
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="">All Categories</option>
        {uniqueTradeTypes.map((tradeType) => (
          <option key={tradeType} value={tradeType}>
            {tradeType}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={handleTradeTypeClick}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Apply Filter
      </button>

      <h2 className="mt-8 text-2xl font-bold">
        Products List for
        {' '}
        {selectedTradeType || 'All Categories'}
      </h2>

      <p className="text-gray-700 mb-4">
        Showing
        {' '}
        {filteredTrades.length}
        {' '}
        products
      </p>

      {/* Render the list of trades as product cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {filteredTrades.map((trade) => (
          <Link
            key={trade.id}
            to={`/trade/${trade.id}`}
            className="border rounded overflow-hidden"
          >
            {/* You can customize the card design based on your preferences */}
            <img
              src={trade.image} // Add the actual image source
              alt={trade.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{trade.name}</h3>
              <p className="text-gray-700">{trade.trade_type}</p>
              <p className="mt-2">
                $
                {trade.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryTrades;
