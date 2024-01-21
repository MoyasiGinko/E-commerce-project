// ordersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_API_URL}/order`;

const initialState = {
  orders: [],
  msg: null,
};

const createOrder = createAsyncThunk(
  'orders/createOrder',
  async ({ customerInfo, items, totalPrice }, { getState }) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const { userId } = getState().auth; // Assuming you have userId in auth state

    try {
      const response = await axios.post(
        BASE_URL,
        {
          customerInfo,
          items,
          totalPrice,
          customerId: userId,
        },
        { headers },
      );
      return response.data;
    } catch (error) {
      return Promise.reject(error.response.statusText);
    }
  },
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.msg = action.error.message;
      });
  },
});

export const orderReducer = orderSlice.reducer;
export { createOrder };
