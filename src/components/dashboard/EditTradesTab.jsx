import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { updateTrade } from '../../redux/reducers/tradesSlice';

const history = createBrowserHistory();

const EditTrade = () => {
  const [editedTrade, setEditedTrade] = useState(null);
  const dispatch = useDispatch();
  const trades = useSelector((state) => state.trades.trades);
  const { tradeId } = useParams();

  useEffect(() => {
    // Find the trade to edit based on the tradeId from the URL parameter
    const tradeToEdit = trades.find(
      (trade) => trade.id === parseInt(tradeId, 10),
    );

    // Set the initial state for editedTrade
    setEditedTrade(tradeToEdit);
  }, [trades, tradeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTrade((prevTrade) => ({
      ...prevTrade,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Dispatch the updateTrade action to update the trade
    dispatch(updateTrade(editedTrade));

    // Redirect or navigate back to the inventory page
    history.push('/trade/dashboard');
  };

  if (!editedTrade) {
    return <div>Loading...</div>; // or a loading spinner
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">
        Edit Trade:
        {' '}
        {editedTrade.name}
      </h2>
      <form onSubmit={(e) => e.preventDefault()}>
        {/* Add your form inputs here */}
        <span className="block mb-4">
          Name:
          <input
            type="text"
            name="name"
            value={editedTrade.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </span>
        {/* Add more input fields based on your trade properties */}
        <span className="block mb-4">
          Quantity:
          <input
            type="number"
            name="quantity"
            value={editedTrade.quantity}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </span>
        <span className="block mb-4">
          Price:
          <input
            type="number"
            name="price"
            value={editedTrade.price}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </span>
        <span className="block mb-4">
          Description:
          <textarea
            name="description"
            value={editedTrade.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </span>
        <span className="block mb-4">
          Type:
          <input
            type="text"
            name="name"
            value={editedTrade.trade_type}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </span>
        <span className="block mb-4">
          Image:
          <input
            type="text"
            name="name"
            value={editedTrade.image}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </span>
      </form>
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={handleSave}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2"
        >
          Save
        </button>
        <Link
          to="/trade/dashboard"
          className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
        >
          Back to Inventory
        </Link>
      </div>
    </div>
  );
};

export default EditTrade;
