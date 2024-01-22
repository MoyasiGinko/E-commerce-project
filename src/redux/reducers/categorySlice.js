// categorySlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../../utils/userStorage';

const BASE_URL = process.env.REACT_APP_API_URL;

const initialState = {
  trades: [],
  tradeCategories: [],
  selectedTradeCategory: null,
  uniqueTradeTypes: [],
  selectedTradeType: null,
  status: 'idle',
  loading: false,
  error: null,
};

export const fetchTradesForCategory = createAsyncThunk(
  'category/fetchTradesForCategory',
  async (_, { getState, rejectWithValue }) => {
    const token = getToken();
    const { selectedTradeType } = getState().category;

    try {
      let apiUrl = `${BASE_URL}/products`; // Modify the endpoint based on your API structure

      if (selectedTradeType) {
        apiUrl += `?category=${selectedTradeType}`; // Adjust the query parameter based on your API
      }

      const tradesResponse = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return tradesResponse.data;
      // // Filter trades to include only those with removed status as false
      // const filteredTrades = tradesResponse.data.filter(
      //   (trade) => !trade.removed
      // );

      // console.log('Fetched trades:', filteredTrades);

      // return filteredTrades;
    } catch (error) {
      console.error('Error fetching trades:', error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const fetchTradeCategories = createAsyncThunk(
  'category/fetchTradeCategories',
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.get(`${BASE_URL}/product-category/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching trade categories:', error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const createTradeCategory = createAsyncThunk(
  'category/createTradeCategory',
  async (tradeCategory, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.post(
        `${BASE_URL}/product-category/`,
        tradeCategory,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error('Error creating trade category:', error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const getTradeCategoryById = createAsyncThunk(
  'category/getTradeCategoryById',
  async (categoryId, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.get(
        `${BASE_URL}/product-category/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching trade category by ID:', error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const updateTradeCategory = createAsyncThunk(
  'category/updateTradeCategory',
  async ({ categoryId, updatedCategory }, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.put(
        `${BASE_URL}/product-category/${categoryId}`,
        updatedCategory,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error('Error updating trade category:', error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const deleteTradeCategory = createAsyncThunk(
  'category/deleteTradeCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.delete(
        `${BASE_URL}/product-category/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error('Error deleting trade category:', error.message);
      return rejectWithValue(error.message);
    }
  },
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    selectTradeType: (state, action) => {
      state.selectedTradeType = action.payload;
    },
    selectTradeCategory: (state, action) => {
      state.selectedTradeCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTradesForCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTradesForCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.trades = action.payload;
        state.uniqueTradeTypes = [
          ...new Set(action.payload.map((trade) => trade.category)),
        ]; // Update this line to use the entire category object
        state.status = 'success';
        state.error = null;
      })
      .addCase(fetchTradesForCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTradeCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTradeCategories.fulfilled, (state, action) => {
        state.loading = false;
        // Assuming the payload is an object with category IDs as keys
        state.categories = Object.values(action.payload);
        state.status = 'success';
        state.error = null;
        console.log('Fetched categories:', state.categories);
      })

      .addCase(fetchTradeCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { selectTradeType, selectTradeCategory } = categorySlice.actions;

export default categorySlice.reducer;
