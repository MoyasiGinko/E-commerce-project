import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { updateTrade } from '../../redux/reducers/tradesSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditTrade = () => {
  const [editedTrade, setEditedTrade] = useState({ name: '', details: '' });
  const dispatch = useDispatch();
  const trades = useSelector((state) => state.trades.trades);
  const { tradeId } = useParams();

  useEffect(() => {
    const tradeToEdit = trades.find(
      (trade) => trade.id === parseInt(tradeId, 10)
    );
    setEditedTrade(tradeToEdit || { name: '', details: '' });
  }, [trades, tradeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTrade((prevTrade) => ({
      ...prevTrade,
      [name]: value,
    }));
  };

  const handleSave = () => {
    dispatch(
      updateTrade({
        id: tradeId,
        name: editedTrade.name,
        details: editedTrade.details,
      })
    );

    // Show successful notification
    toast.success('Trade updated successfully!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  if (!editedTrade) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          Edit Trade: {editedTrade.name}
        </h2>
        <form>
          <div className="mb-6">
            <label htmlFor="name" className="text-sm text-gray-600 block mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedTrade.name}
              onChange={handleInputChange}
              className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-500 transition-all duration-300"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="details"
              className="text-sm text-gray-600 block mb-2"
            >
              Details:
            </label>
            <textarea
              id="details"
              name="details"
              value={editedTrade.details}
              onChange={handleInputChange}
              className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-blue-500 transition-all duration-300"
            />
          </div>
        </form>
        <div className="flex justify-end mt-8">
          <button
            type="button"
            onClick={handleSave}
            className="bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600 mr-4 transition-all duration-300"
          >
            Save
          </button>
          <Link
            to="/trade/dashboard"
            className="bg-gray-300 text-gray-800 py-3 px-6 rounded hover:bg-gray-400 transition-all duration-300"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditTrade;
