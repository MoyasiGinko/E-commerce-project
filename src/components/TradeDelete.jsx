import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { fetchTrades, deleteTrade } from '../redux/reducers/tradesSlice';
import { getUserRole, getUserId } from '../utils/userStorage';
import loadingImage from '../assets/images/loading.gif';
import 'react-toastify/dist/ReactToastify.css';

const TradeDelete = () => {
  const dispatch = useDispatch();
  const isAdmin = getUserRole() === 'VENDOR';
  const trades = useSelector((state) => state.trades.trades);
  const loading = useSelector((state) => state.trades.loading);
  const currentUserId = getUserId();

  useEffect(() => {
    dispatch(fetchTrades(true));
  }, [dispatch]);

  if (!isAdmin) {
    return (
      <div className="text-center mt-4 font-semibold text-red-500 w-full">
        You must be a vendor to see this page
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center mt-4">
        <img src={loadingImage} alt="Loading..." />
      </div>
    );
  }

  const filteredTrades = trades.filter(
    (trade) => trade.vendorId === currentUserId,
  );

  const handleRemoveTrade = (tradeId, tradeName) => {
    dispatch(deleteTrade(tradeId));
    toast.success(`Product "${tradeName}" removed successfully!`);
  };

  return (
    <div className="text-center mt-4 w-full">
      <h2 className="text-3xl font-bold mb-4 text-neutral-800">
        Product Delete
      </h2>
      <p className="text-sm font-semibold text-gray-500 mb-6">
        Click on a product to remove it.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTrades.map((trade) => (
          <div
            key={trade.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer relative"
          >
            <div
              className={`bg-cover bg-center bg-no-repeat h-72 ${
                trade.removed ? 'grayscale' : ''
              } transition-all duration-300`}
              style={{ backgroundImage: `url(${trade.imageURL})` }}
            />
            <div className="p-6 bg-black backdrop-filter bg-opacity-50 absolute inset-0 flex flex-col items-center justify-center text-white">
              <h5
                className={`text-2xl font-semibold ${
                  trade.removed
                    ? 'text-gradient text-outline'
                    : 'text-white text-shadow'
                }`}
              >
                {trade.name}
              </h5>
              <button
                type="button"
                className={`text-sm mt-4 px-4 py-2 rounded-md shadow-md ${
                  trade.removed
                    ? 'bg-gray-300 text-neutral-600 hover:bg-green-300 hover:text-neutral-800'
                    : 'bg-red-500 text-white hover:bg-red-600 hover:text-white'
                } transition-colors flex items-center`}
                onClick={() => handleRemoveTrade(trade.id, trade.name)}
              >
                <FontAwesomeIcon icon={faTrash} className="mr-2" />
                {trade.removed ? 'Restore' : 'Remove'}
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default TradeDelete;
