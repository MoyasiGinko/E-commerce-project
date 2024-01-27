import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../../utils/userStorage';

const BASE_URL = `${process.env.REACT_APP_API_URL}/payment/`;

const initialState = {
  payment: null,
  error: null,
  loading: false,
};

const makePayment = createAsyncThunk(
  'payment/makePayment',
  async (paymentData) => {
    try {
      const token = getToken(); // Get the token from user storage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token to the Authorization header
        },
      };
      const response = await axios.post(BASE_URL, paymentData, config);
      return response.data;
    } catch (error) {
      throw error.response.data; // Throwing the error response for rejection
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(makePayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(makePayment.fulfilled, (state, action) => {
        state.payment = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(makePayment.rejected, (state, action) => {
        state.payment = null;
        state.loading = false;
        state.error = action.error;
      });
  },
});

export { makePayment };
export const paymentReducer = paymentSlice.reducer;
