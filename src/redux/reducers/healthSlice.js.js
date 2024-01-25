// orderHistorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../../utils/userStorage';

const BASE_URL = `${process.env.REACT_APP_API_URL}/orderHistory`;

const initialState = {
  orderHistory: [],
  loading: false,
  error: null,
};

export const healthCheck = createAsyncThunk(
  'orderHistory/fetchOrderHistory',
  async () => {
    const token = getToken();
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
);

const healthSlice = createSlice({
  name: 'orderHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.orderHistory = action.payload;
      })
      .addCase(fetchOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default healthSlice.reducer;
