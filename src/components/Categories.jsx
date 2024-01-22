import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  fetchTradesForCategory,
  selectTradeType,
} from '../redux/reducers/categorySlice';

const CategoryTrades = () => {
  const dispatch = useDispatch();
  const { uniqueTradeTypes, loading, error, selectedTradeType, trades } =
    useSelector((state) => state.category);

  const [selectedType, setSelectedType] = useState(selectedTradeType || '');

  useEffect(() => {
    dispatch(fetchTradesForCategory());
  }, [dispatch, selectedType]); // Add selectedType as a dependency if needed

  const handleFilterApply = () => {
    dispatch(selectTradeType(selectedType));
  };

  const filteredTrades = selectedTradeType
    ? trades.filter((trade) => trade.category.name === selectedTradeType)
    : trades;

  console.log('Trades:', trades);
  console.log('Filtered Trades:', filteredTrades);
  console.log('Unique Trade Types:', uniqueTradeTypes);
  
  return (
    <div className="container mx-auto p-4">
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
          <option key={tradeType.id} value={tradeType.name}>
            {tradeType.name}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={handleFilterApply}
        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Apply Filter
      </button>

      <h2 className="mt-8 text-2xl font-bold">
        Products List for {selectedTradeType || 'All Categories'}
      </h2>

      <p className="text-gray-700 mb-4">
        Showing {filteredTrades.length} products
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {filteredTrades.map((trade) => (
          <Link
            key={trade.id}
            to={`/trade/${trade.id}`}
            className="border rounded overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105"
          >
            <img
              src={trade.imageURL}
              alt={trade.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{trade.name}</h3>
              <p className="text-gray-700">
                {trade.category ? trade.category.name : 'No Category'}
              </p>
              <p className="mt-2">${trade.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryTrades;
