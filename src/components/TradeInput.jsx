import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addTrades } from '../redux/reducers/tradesSlice';
import {
  fetchTradeCategories,
  selectTradeType,
  selectTradeCategory,
} from '../redux/reducers/categorySlice';
import { getUserRole } from '../utils/userStorage';
import '../styles/trade.css';

const TradeInput = () => {
  const dispatch = useDispatch();
  const tradeLoading = useSelector((state) => state.trades.loading);
  const tradeError = useSelector((state) => state.trades.error);
  const tradeSuccess = useSelector((state) => state.trades.status);
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useSelector((state) => state.category);
  const navigate = useNavigate();

  const isAdmin = getUserRole() === 'VENDOR';

  const [tradeData, setTradeData] = useState({
    name: '',
    brand: '',
    details: '',
    price: 0,
    category: '',
    quantity: 0,
    imageURL: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    dispatch(fetchTradeCategories()).catch((error) => {
      console.error('Error fetching categories:', error);
    });
  }, [dispatch]);

  useEffect(() => {
    if (tradeSuccess === 'success') {
      navigate('/trade');
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
      (category) => category.id === parseInt(selectedCategoryId, 10),
    );

    dispatch(selectTradeType(selectedCategory.id));
    dispatch(selectTradeCategory(selectedCategory));

    setTradeData({
      ...tradeData,
      category: selectedCategory, // Store the entire category object
    });
  };

  if (!isAdmin) {
    return (
      <div className="text-center mt-4 font-semibold text-red-500 w-full">
        You must be a vendor to see this page
      </div>
    );
  }

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
        });
        setErrorMessage('');
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  };

  if (categoriesLoading) {
    return <div>Loading categories...</div>;
  }

  if (categoriesError) {
    return (
      <div>
        Error loading categories:
        {categoriesError}
      </div>
    );
  }
  console.log('Categories:', categories);

  return (
    <div className="text-center mt-20 w-full">
      <h2 className="text-xl font-semibold mb-4">Add a New Product</h2>
      <div className="bg-white bg-opacity-90 shadow-md p-9 rounded-3xl mx-auto max-w-md tradeinput-container">
        {errorMessage && (
          <div className="text-red-500 mb-4">{errorMessage}</div>
        )}
        <form onSubmit={handleNewTrade} className="space-y-4">
          {tradeError && <div className="text-red-500">{tradeError}</div>}

          <input
            type="text"
            name="name"
            placeholder="Trade Name"
            value={tradeData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 border border-gray-300"
            required
          />

          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={tradeData.brand}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 border border-gray-300"
            required
          />

          <textarea
            name="details"
            placeholder="Details"
            value={tradeData.details}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 border border-gray-300"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={tradeData.price}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 border border-gray-300"
            required
          />

          {/* Dropdown for selecting category */}
          <select
            name="category"
            value={tradeData.category ? tradeData.category.id : ''}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 border border-gray-300"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories
              && categories.map((category) => (
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
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 border border-gray-300"
            required
          />

          <input
            type="text"
            name="imageURL"
            placeholder="Image URL"
            value={tradeData.imageURL}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 border border-gray-300"
            required
          />

          <button
            type="submit"
            className={`bg-yellow-600 hover:bg-red-700 text-white px-4 py-2 rounded-md ${
              tradeLoading ? 'cursor-not-allowed' : ''
            }tradeBtn`}
            disabled={tradeLoading}
          >
            {tradeLoading ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TradeInput;
