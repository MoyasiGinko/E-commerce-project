// categorySlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../../utils/userStorage';

const BASE_URL = `${process.env.REACT_APP_API_URL}/trades`;

const initialState = {
  trades: [],
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
      let apiUrl = BASE_URL;

      if (selectedTradeType) {
        apiUrl += `?trade_type=${selectedTradeType}`;
      }

      const tradesResponse = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Fetched trades:', tradesResponse.data);

      return tradesResponse.data;
    } catch (error) {
      console.error('Error fetching trades:', error.message);
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
          ...new Set(action.payload.map((trade) => trade.trade_type)),
        ];
        state.status = 'success';
        state.error = null;
      })
      .addCase(fetchTradesForCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { selectTradeType } = categorySlice.actions;

export default categorySlice.reducer;
