import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { updateTrade } from '../redux/reducers/tradesSlice';
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
        brand: editedTrade.brand,
        price: editedTrade.price,
        imageURL: editedTrade.imageURL,
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
    <div className="bg-vintage-yellow min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-vintage-blue rounded shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-vintage-white">
          {editedTrade.name}
        </h2>
        <form>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="text-sm text-vintage-white block mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedTrade.name}
              onChange={handleInputChange}
              className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-yellow-500 transition-all duration-300 bg-vintage-white text-vintage-blue"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="details"
              className="text-sm text-vintage-white block mb-2"
            >
              Details:
            </label>
            <textarea
              id="details"
              name="details"
              value={editedTrade.details}
              onChange={handleInputChange}
              className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-yellow-500 transition-all duration-300 bg-vintage-white text-vintage-blue"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="brand"
              className="text-sm text-vintage-white block mb-2"
            >
              Brand:
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={editedTrade.brand}
              onChange={handleInputChange}
              className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-yellow-500 transition-all duration-300 bg-vintage-white text-vintage-blue"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="price"
              className="text-sm text-vintage-white block mb-2"
            >
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={editedTrade.price}
              onChange={handleInputChange}
              className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-yellow-500 transition-all duration-300 bg-vintage-white text-vintage-blue"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="image"
              className="text-sm text-vintage-white block mb-2"
            >
              Image:
            </label>
            <input
              placeholder="Image URL"
              id="image"
              name="image"
              value={editedTrade.imageURL}
              onChange={handleInputChange}
              className="w-full p-3 border rounded focus:outline-none focus:ring focus:border-yellow-500 transition-all duration-300 bg-vintage-white text-vintage-blue"
            />
          </div>
        </form>
        <div className="flex justify-end mt-8">
          <button
            type="button"
            onClick={handleSave}
            className="bg-vintage-blue text-vintage-white py-3 px-6 rounded hover:bg-vintage-dark-blue mr-4 transition-all duration-300"
          >
            Save
          </button>
          <Link
            to="/trade/edit-product"
            className="bg-vintage-dark-blue text-vintage-white py-3 px-6 rounded hover:bg-vintage-darker-blue transition-all duration-300"
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
