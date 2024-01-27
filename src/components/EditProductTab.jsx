import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { updateTrade } from '../redux/reducers/tradesSlice';
import 'react-toastify/dist/ReactToastify.css';
import backgroundImage from '../assets/images/bg-splash-2.jpg';

const EditTrade = () => {
  const [editedTrade, setEditedTrade] = useState({ name: '', details: '' });
  const dispatch = useDispatch();
  const trades = useSelector((state) => state.trades.trades);
  const { tradeId } = useParams();

  useEffect(() => {
    const tradeToEdit = trades.find(
      (trade) => trade.id === parseInt(tradeId, 10),
    );
    setEditedTrade(
      tradeToEdit || {
        name: '',
        details: '',
        imageURL: '',
        brand: '',
        price: '',
      },
    );
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
      }),
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
    <div
      className="flex items-center justify-center h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <ToastContainer />
      <div
        className="bg-white shadow-md p-8 rounded-md tradeinput-container"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
      >
        <h2 className="text-3xl mb-6 text-gray-700 font-semibold">
          {editedTrade.name}
        </h2>
        <form className="space-y-4 w-full">
          <div>
            <span htmlFor="name" className="text-sm block mb-2">
              Name:
            </span>
            <input
              type="text"
              id="name"
              name="name"
              value={editedTrade.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-md mb-2 focus:outline-none focus:ring focus:border-blue-300 border border-gray-300"
            />
          </div>
          <div>
            <span htmlFor="details" className="text-sm block mb-2">
              Details:
            </span>
            <textarea
              id="details"
              name="details"
              value={editedTrade.details}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-md mb-2 focus:outline-none focus:ring focus:border-blue-300 border border-gray-300"
            />
          </div>
          <div>
            <span htmlFor="brand" className="text-sm block mb-2">
              Brand:
            </span>
            <input
              type="text"
              id="brand"
              name="brand"
              value={editedTrade.brand}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-md mb-2 focus:outline-none focus:ring focus:border-blue-300 border border-gray-300"
            />
          </div>
          <div>
            <span htmlFor="price" className="text-sm block mb-2">
              Price:
            </span>
            <input
              type="number"
              id="price"
              name="price"
              value={editedTrade.price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-md mb-2 focus:outline-none focus:ring focus:border-blue-300 border border-gray-300"
            />
          </div>
          <div>
            <span htmlFor="image" className="text-sm block mb-2">
              Image:
            </span>
            <input
              type="text"
              placeholder="Image URL"
              id="imageURL"
              name="imageURL"
              value={editedTrade.imageURL}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-md mb-2 focus:outline-none focus:ring focus:border-blue-300 border border-gray-300"
            />
          </div>
        </form>
        <div className="flex justify-end mt-8">
          <Link
            to="/trade/edit-product"
            className="submit-button"
          >
            <button
              type="button"
              onClick={handleSave}
              to="/trade/edit-product"
              className="submit-button bg-gray-500 font-bold hover:bg-red-500 text-white px-6 py-2 rounded-md mr-4"
            >
              Save
            </button>
          </Link>
          <Link
            to="/trade/edit-product"
            className="submit-button bg-gray-500 font-bold hover:bg-red-500 text-white px-6 py-2 rounded-md"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EditTrade;
