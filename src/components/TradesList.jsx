import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTrades } from '../redux/reducers/tradesSlice';
import loadingImage from '../assets/images/loading.gif';

const TradesList = () => {
  const dispatch = useDispatch();
  const trades = useSelector((state) => state.trades.trades);
  const loading = useSelector((state) => state.trades.loading);
  const error = useSelector((state) => state.trades.error);

  useEffect(() => {
    dispatch(fetchTrades());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center mt-4">
        <img src={loadingImage} alt="Loading..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-4 text-red-600">
        Error:
        {error}
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {trades.map((trade) => (
          <Link
            key={trade.id}
            to={`/trade/${trade.id}`}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer relative border border-gray-200"
          >
            <div
              style={{
                backgroundImage: `url(${trade.image})`,
                height: '200px',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              className="bg-cover bg-center bg-no-repeat h-72 transition-all duration-300"
            />
            <div className="p-4">
              <h5 className="text-lg font-semibold">{trade.name}</h5>
              <p className="text-gray-500 text-sm mt-2">{trade.description}</p>
              <p className="text-green-500 text-base mt-2">{`$${trade.price}`}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TradesList;
