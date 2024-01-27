import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../../utils/userStorage';

const BASE_URL = `${process.env.REACT_APP_API_URL}/product/`;

// Axios instance with common headers
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the token in every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

const initialState = {
  trades: [],
  status: 'idle',
  loading: false,
  error: null,
};

export const addTrades = createAsyncThunk('trades/AddTrades', async (add) => {
  try {
    const response = await axiosInstance.post('', add);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const updateTrade = createAsyncThunk(
  'trades/updateTrade',
  async ({
    id, name, details, quantity, price, brand, category, imageURL,
  }) => {
    try {
      const response = await axiosInstance.put(`${id}/`, {
        name,
        details,
        quantity,
        price,
        brand,
        category,
        imageURL,
      });
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  },
);

export const fetchTrades = createAsyncThunk('trades/fetchTrades', async () => {
  try {
    const response = await axiosInstance.get('');
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const deleteTrade = createAsyncThunk(
  'trades/deleteTrade',
  async (tradeId) => {
    try {
      await axiosInstance.delete(`${tradeId}/`);
      return tradeId; // Return the deleted trade's ID
    } catch (error) {
      return error.response.data;
    }
  },
);

const tradesSlice = createSlice({
  name: 'trades',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrades.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTrades.fulfilled, (state, action) => {
        state.loading = false;
        const {
          name,
          details,
          imageURL,
          price,
          quantity,
          brand,
          category,
          vendorId,
        } = action.payload;

        const newTrade = {
          name,
          details,
          imageURL,
          price,
          quantity,
          brand,
          category,
          vendorId,
        };
        state.trades.push(newTrade);
        state.status = 'success';
        state.error = null;
      })
      .addCase(addTrades.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTrades.fulfilled, (state, action) => {
        state.loading = false;
        state.trades = action.payload;
      })
      .addCase(fetchTrades.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteTrade.fulfilled, (state, action) => {
        // Remove the trade from the state using its ID
        state.trades = state.trades.filter(
          (trade) => trade.id !== action.payload,
        );
      })
      .addCase(updateTrade.fulfilled, (state, action) => {
        const updatedTrade = action.payload;

        // Find the index of the trade to be updated in the state
        const index = state.trades.findIndex(
          (trade) => trade.id === updatedTrade.id,
        );

        // If the trade is found in the state, update it
        if (index !== -1) {
          state.trades[index] = {
            ...state.trades[index], // Keep other properties
            ...updatedTrade, // Update with new values
          };
        }
      })
      .addCase(updateTrade.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tradesSlice.reducer;
