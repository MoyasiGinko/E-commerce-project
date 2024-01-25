import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { addTrades } from '../redux/reducers/tradesSlice';
import {
  fetchTradeCategories,
  selectTradeType,
  selectTradeCategory,
} from '../redux/reducers/categorySlice';
import { getUserRole, getUserId } from '../utils/userStorage';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/trade.css';
import backgroundImage from '../assets/images/bg-splash-2.jpg';

const TradeInput = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tradeLoading = useSelector((state) => state.trades.loading);
  const tradeError = useSelector((state) => state.trades.error);
  const tradeSuccess = useSelector((state) => state.trades.status);
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useSelector((state) => state.category);

  const isAdmin = getUserRole() === 'VENDOR';
  const currentUserId = getUserId();

  const [tradeData, setTradeData] = useState({
    name: '',
    brand: '',
    details: '',
    price: 0,
    category: '',
    quantity: 0,
    imageURL: '',
    vendorId: currentUserId,
  });

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    dispatch(fetchTradeCategories()).catch((error) => {
      console.error('Error fetching categories:', error);
    });
  }, [dispatch]);

  useEffect(() => {
    if (tradeSuccess === 'success') {
      // Show a success notification when trade is added successfully
      toast.success('Trade added successfully!');
      navigate('/trade/add');
    }
  }, [tradeSuccess, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTradeData({
      ...tradeData,
      [name]: value,
    });
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    const selectedCategory = categories.find(
      (category) => category.id === parseInt(selectedCategoryId, 10)
    );

    dispatch(selectTradeType(selectedCategory.id));
    dispatch(selectTradeCategory(selectedCategory));

    setTradeData({
      ...tradeData,
      category: selectedCategory, // Store the entire category object
    });
  };

  const handleNewTrade = (e) => {
    e.preventDefault();

    const newTradeData = {
      name: tradeData.name,
      brand: tradeData.brand,
      details: tradeData.details,
      price: parseFloat(tradeData.price),
      category: tradeData.category, // Use the entire category object
      quantity: parseFloat(tradeData.quantity),
      imageURL: tradeData.imageURL,
      vendorId: currentUserId,
    };

    dispatch(addTrades(newTradeData))
      .then(() => {
        setTradeData({
          name: '',
          brand: '',
          details: '',
          price: 0,
          category: '',
          quantity: 0,
          imageURL: '',
          vendorId: currentUserId,
        });
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  };

  if (!isAdmin) {
    return (
      <div className="text-center mt-4 font-semibold text-red-500 w-full">
        You must be a vendor to see this page
      </div>
    );
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
        {errorMessage && (
          <div className="text-red-500 mb-4">{errorMessage}</div>
        )}
        <form onSubmit={handleNewTrade} className="space-y-4 max-w-md">
          {tradeError && <div className="text-red-500">{tradeError}</div>}

          <input
            type="text"
            name="name"
            placeholder="Trade Name"
            value={tradeData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md mb-2 focus:outline-none focus:ring focus:border-blue-300 border border-gray-300"
            required
          />

          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={tradeData.brand}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md mb-2 focus:outline-none focus:ring focus:border-blue-300 border border-gray-300"
            required
          />

          <textarea
            name="details"
            placeholder="Details"
            value={tradeData.details}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md mb-2 focus:outline-none focus:ring focus:border-blue-300 border border-gray-300"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={tradeData.price}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md mb-2 focus:outline-none focus:ring focus:border-blue-300 border border-gray-300"
            required
          />

          <select
            name="category"
            value={tradeData.category ? tradeData.category.id : ''}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2 rounded-md mb-2 focus:outline-none focus:ring focus:border-blue-300 border border-gray-300"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories &&
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={tradeData.quantity}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md mb-2 focus:outline-none focus:ring focus:border-blue-300 border border-gray-300"
            required
          />

          <input
            type="text"
            name="imageURL"
            placeholder="Image URL"
            value={tradeData.imageURL}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md mb-2 focus:outline-none focus:ring focus:border-blue-300 border border-gray-300"
            required
          />
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className={`submit-button bg-gray-500 font-bold hover:bg-red-500 text-white px-6 py-2 rounded-md ${
                tradeLoading ? 'cursor-not-allowed' : ''
              }tradeBtn`}
              disabled={tradeLoading}
            >
              {tradeLoading ? 'Adding Product...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TradeInput;
