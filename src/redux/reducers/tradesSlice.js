// tradesSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../../utils/userStorage';

const BASE_URL = `${process.env.REACT_APP_API_URL}/product`;
const initialState = {
  trades: [],
  status: 'idle',
  loading: false,
  error: null,
};

export const addTrades = createAsyncThunk('trades/AddTrades', async (add) => {
  try {
    const token = getToken();
    const response = await axios.post(BASE_URL, add, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const updateTrade = createAsyncThunk(
  'trades/updateTrade',
  async ({ id, name, details, quantity, price }) => {
    try {
      const token = getToken();
      const response = await axios.put(
        `${BASE_URL}/${id}`,
        {
          name,
          details,
          quantity,
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const token = getToken();

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
};

export const fetchTrades = createAsyncThunk('trades/fetchTrades', async () => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

export const deleteTrade = createAsyncThunk(
  'trades/deleteTrade',
  async (tradeId) => {
    try {
      const token = getToken();
      await axios.delete(`${BASE_URL}/${tradeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return tradeId; // Return the deleted trade's ID
    } catch (error) {
      return error.response.data;
    }
  }
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
          description,
          image,
          price,
          duration,
          location,
          tradeType,
          userId,
        } = action.payload;

        const newTrade = {
          name,
          description,
          image,
          price,
          duration,
          location,
          tradeType,
          userId,
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
          (trade) => trade.id !== action.payload
        );
      })
      .addCase(updateTrade.fulfilled, (state, action) => {
        const index = state.trades.findIndex(
          (trade) => trade.id === action.payload.id
        );
        state.trades[index] = action.payload;
      })
      .addCase(updateTrade.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tradesSlice.reducer;
