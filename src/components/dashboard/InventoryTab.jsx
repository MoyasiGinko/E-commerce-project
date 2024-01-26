import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { getUserId } from '../../utils/userStorage';
import { updateTrade, fetchTrades } from '../../redux/reducers/tradesSlice';
import 'react-toastify/dist/ReactToastify.css';

const InventoryTab = () => {
  const dispatch = useDispatch();
  const trades = useSelector((state) => state.trades.trades);
  const [loading, setLoading] = useState(true);
  const [editableTradeId, setEditableTradeId] = useState(null);
  const [updatedQuantity, setUpdatedQuantity] = useState('');
  const userId = getUserId(); // Move the declaration here

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

  const handleEditClick = (tradeId) => {
    setEditableTradeId(tradeId);
  };

  const handleUpdateQuantity = async () => {
    const tradeToUpdate = trades.find((trade) => trade.id === editableTradeId);

    if (tradeToUpdate && updatedQuantity !== '') {
      // Dispatch updateTrade action
      await dispatch(
        updateTrade({
          id: editableTradeId,
          quantity: updatedQuantity,
        }),
      );

      // Show toast notification
      toast.success('Quantity updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Reset editable trade ID and updated quantity
      setEditableTradeId(null);
      setUpdatedQuantity('');
    }
  };

  const getStockStatus = (quantity) => {
    if (quantity > 20) {
      return 'In Stock';
    } if (quantity > 10) {
      return 'Stock Running Out';
    } if (quantity > 1) {
      return 'Low Stock';
    }
    return 'Out of Stock';
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('Checking stock status...');

      const filteredTrades = trades.filter(
        (trade) => trade.vendorId === userId,
      );

      filteredTrades.forEach((trade) => {
        const stockStatus = getStockStatus(trade.quantity);

        if (
          ['Stock Running Out', 'Low Stock', 'Out of Stock'].includes(
            stockStatus,
          )
        ) {
          toast.info(`Stock Status: ${stockStatus} for ${trade.name}`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      });
    }, 10000);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [trades, userId]);

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  const filteredTrades = trades.filter((trade) => trade.vendorId === userId);

  return (
    <div>
      <ToastContainer />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredTrades.map((trade) => (
          <div
            key={trade.id}
            className="border p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 bg-white bg-opacity-80"
          >
            <Link
              key={trade.id}
              to={`/trade/${trade.id}`}
              className="cursor-pointer relative border border-gray-200 block overflow-hidden rounded-md"
            >
              <img
                src={trade.imageURL}
                alt={trade.name}
                className="w-full h-48 object-cover transition-transform transform hover:scale-105"
              />
            </Link>
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">{trade.name}</h2>
              <p className="text-gray-500 mb-2">{`Quantity: ${trade.quantity}`}</p>
              <p className="text-red-500 font-bold">
                {getStockStatus(trade.quantity)}
              </p>

              {editableTradeId === trade.id ? (
                <div className="flex items-center mt-2">
                  <input
                    type="text"
                    value={updatedQuantity}
                    onChange={(e) => setUpdatedQuantity(e.target.value)}
                    placeholder="New Quantity"
                    className="flex-grow p-2 border mr-2"
                  />
                  <button
                    onClick={handleUpdateQuantity}
                    className="bg-violet-500 text-white py-2 px-4 rounded hover:bg-violet-600"
                  >
                    Update
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleEditClick(trade.id)}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mt-2"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryTab;
