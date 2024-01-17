import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchTradeDetails } from '../redux/reducers/tradeDetailsSlice';
import loadingImage from '../assets/images/loading.gif';
import Recommendation from './Recommendation';

const TradesDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const trade = useSelector((state) => state.tradeDetails.trade);

  useEffect(() => {
    dispatch(fetchTradeDetails(id));
  }, [dispatch, id]);

  if (!trade) {
    return (
      <div className="text-center mt-4">
        <img
          src={loadingImage} // Use the imported image here
          alt="Loading..."
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-screen-2xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white rounded-lg shadow-md">
          <div className="md:col-span-1">
            <img
              src={trade.image}
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
              {trade.description}
            </p>
            <p className="text-gray-700 text-lg mb-2">
              <strong>Location:</strong>
              {' '}
              {trade.location}
            </p>
            <p className="text-gray-700 text-lg mb-2">
              <strong>Price:</strong>
              {' '}
              $
              {trade.price}
            </p>
            <p className="text-gray-700 text-lg mb-2">
              <strong>Duration:</strong>
              {' '}
              {trade.duration}
              {' '}
              hours
            </p>
            <p className="text-gray-700 text-lg mb-2">
              <strong>Type:</strong>
              {' '}
              {trade.trade_type}
            </p>
            <div className="mt-6">
              <Link
                to={`/trade/reserve/${trade.id}`}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full transition-colors duration-300 text-lg font-semibold inline-block"
              >
                Add to Cart
              </Link>
            </div>
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
