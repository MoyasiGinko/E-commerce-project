import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTrades } from '../redux/reducers/tradesSlice';
import loadingImage from '../assets/images/loading.gif';
import TopSellersSlider from './ProductSlide';

const TradesList = () => {
  const dispatch = useDispatch();
  const trades = useSelector((state) => state.trades.trades);
  const loading = useSelector((state) => state.trades.loading);
  const error = useSelector((state) => state.trades.error);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchTrades());
  }, [dispatch]);

  const handleSearch = () => {
    // Implement search functionality if needed
    console.log('Searching for:', searchTerm);
  };

  if (loading) {
    return (
      <div className="text-center mt-8">
        <img src={loadingImage} alt="Loading..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-8 text-red-600">
        Error:
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-end items-center mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="border p-2 rounded-md w-64 bg-nude text-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      <TopSellersSlider />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
        {trades.map((trade) => (
          <Link
            key={trade.id}
            to={`/trade/${trade.id}`}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transform hover:scale-105 transition-transform cursor-pointer border border-gray-200"
          >
            <div
              style={{
                backgroundImage: `url(${trade.imageURL})`,
                height: '200px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              className="bg-cover bg-center bg-no-repeat h-72 transition-all duration-300"
            />
            <div className="p-4">
              <h5 className="text-lg font-semibold mb-2">{trade.name}</h5>
              <p className="text-gray-500 text-sm mb-2">{trade.brand}</p>
              <p className="text-green-500 text-base">{`$${trade.price}`}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TradesList;
