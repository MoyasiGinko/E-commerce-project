import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
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
      (category) => category.id === parseInt(selectedCategoryId, 10),
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
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className="full-height bg-vintage-yellow"
      >
        <Paper
          elevation={3}
          className="p-8 rounded-md tradeinput-container"
          style={{
            backgroundColor: '#ffffffe6',
            transform: 'translateY(-20px)',
            transition: 'transform 0.3s ease',
          }}
        >
          {errorMessage && (
            <Typography variant="body1" color="error" className="mb-4">
              {errorMessage}
            </Typography>
          )}
          <form onSubmit={handleNewTrade} className="space-y-4">
            {tradeError && (
              <Typography variant="body1" color="error">
                {tradeError}
              </Typography>
            )}

            <Typography
              component="h2"
              variant="h4"
              color="textPrimary"
              gutterBottom
              className="text-3xl mb-8 text-gray-700"
              style={{
                fontFamily: 'cursive',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              Add a New Product
            </Typography>

            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              id="name"
              label="Trade Name"
              name="name"
              value={tradeData.name}
              onChange={handleInputChange}
              required
              className="rounded-md"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
            />

            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              id="brand"
              label="Brand"
              name="brand"
              value={tradeData.brand}
              onChange={handleInputChange}
              required
              className="rounded-md"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
            />

            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              id="details"
              label="Details"
              name="details"
              value={tradeData.details}
              onChange={handleInputChange}
              required
              className="rounded-md"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
            />

            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              type="number"
              id="price"
              label="Price"
              name="price"
              value={tradeData.price}
              onChange={handleInputChange}
              required
              className="rounded-md"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
            />
            <Select
              fullWidth
              variant="outlined"
              margin="normal"
              id="category"
              label="Category"
              name="category"
              value={tradeData.category ? tradeData.category.id : ''}
              onChange={handleCategoryChange}
              required
              className="rounded-md"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                color: 'rgba(0, 0, 0, 1)',
              }}
            >
              <MenuItem value="" disabled selected>
                Select a category
              </MenuItem>
              {categories
                && categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
            </Select>

            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              type="number"
              id="quantity"
              label="Quantity"
              name="quantity"
              value={tradeData.quantity}
              onChange={handleInputChange}
              required
              className="rounded-md"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
            />

            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              id="imageURL"
              label="Image URL"
              name="imageURL"
              value={tradeData.imageURL}
              onChange={handleInputChange}
              required
              className="rounded-md"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={tradeLoading}
              className="submit-button tradeBtn rounded-md"
            >
              {tradeLoading ? 'Adding Product...' : 'Add Product'}
            </Button>
          </form>
        </Paper>
      </Grid>
      <ToastContainer />
    </Container>
  );
};

export default TradeInput;
