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
    dispatch(fetchTradesForCategory());
  }, [dispatch, selectedType]);

  const handleFilterApply = () => {
    dispatch(selectTradeType(selectedType));
  };

  const filteredTrades = selectedTradeType
    ? trades.filter((trade) => trade.category.name === selectedTradeType)
    : trades;

  const uniqueTradeTypeSet = new Set();

  if (loading) {
    return <p>Loading trades...</p>;
  }
  if (error) {
    return (
      <p>
        Error fetching trades:
        {error}
      </p>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-800 p-4 rounded-md mb-4">
        <span
          htmlFor="tradeType"
          className="block mb-2 text-2xl font-bold text-gray-300"
        >
          Select a Category
        </span>
        <div className="flex items-center">
          <select
            id="tradeType"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full p-2 border mr-4 rounded focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">All Categories</option>
            {uniqueTradeTypes.map((tradeType) => {
              if (!uniqueTradeTypeSet.has(tradeType.name)) {
                uniqueTradeTypeSet.add(tradeType.name);

                return (
                  <option key={tradeType.id} value={tradeType.name}>
                    {tradeType.name}
                  </option>
                );
              }

              return null;
            })}
          </select>
          <button
            type="button"
            onClick={handleFilterApply}
            className="p-2 w-40 bg-gray-500 font-bold text-white rounded hover:bg-red-600 transition focus:outline-none"
          >
            Apply Filter
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-2">
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredTrades.map((trade) => (
          <Link
            key={trade.id}
            to={`/trade/${trade.id}`}
            className="border border-gray-300 rounded-md overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105"
          >
            <img
              src={trade.imageURL}
              alt={trade.name}
              className="w-full h-40 object-cover rounded-t-md"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{trade.name}</h3>
              <p className="text-gray-700">
                {trade.category ? trade.category.name : 'No Category'}
              </p>
              <p className="mt-2 text-lg text-red-500 font-bold">
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
