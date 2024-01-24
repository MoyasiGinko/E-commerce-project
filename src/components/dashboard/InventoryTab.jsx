import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserId } from '../../utils/userStorage';
import { updateTrade, fetchTrades } from '../../redux/reducers/tradesSlice';

const InventoryTab = () => {
  const dispatch = useDispatch();
  const trades = useSelector((state) => state.trades.trades);
  const [loading, setLoading] = useState(true);
  const [editableTradeId, setEditableTradeId] = useState(null);
  const [updatedQuantity, setUpdatedQuantity] = useState('');

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

      // Reset editable trade ID and updated quantity
      setEditableTradeId(null);
      setUpdatedQuantity('');
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  const userId = getUserId();
  const filteredTrades = trades.filter((trade) => trade.vendorId === userId);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredTrades.map((trade) => (
        <div key={trade.id} className="border p-4 rounded-lg">
          <Link
            key={trade.id}
            to={`/trade/${trade.id}`}
            className="cursor-pointer relative border border-gray-200"
          >
            <img
              src={trade.imageURL}
              alt={trade.name}
              className="w-full h-40 object-cover mb-4"
            />
          </Link>
          <h2 className="text-xl font-semibold mb-2">{trade.name}</h2>
          <p className="text-gray-500 mb-2">{`Type: ${trade.category.name}`}</p>
          <p className="text-gray-500 mb-2">{`Price: $${trade.price}`}</p>
          <p className="text-gray-500 mb-2">{`Quantity: ${trade.quantity}`}</p>

          {editableTradeId === trade.id ? (
            <>
              <input
                type="text"
                value={updatedQuantity}
                onChange={(e) => setUpdatedQuantity(e.target.value)}
                placeholder="New Quantity"
                className="mb-2 p-2 border"
              />
              <button
                onClick={handleUpdateQuantity}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mr-2"
              >
                Update Quantity
              </button>
            </>
          ) : (
            <button
              onClick={() => handleEditClick(trade.id)}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Edit
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default InventoryTab;
