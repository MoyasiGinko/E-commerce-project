import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken, getUserId } from '../../utils/userStorage';

const BASE_URL = `${process.env.REACT_APP_API_URL}/order/`;

const initialState = {
  orders: [],
  msg: null,
};

const createOrder = createAsyncThunk(
  'orders/createOrder',
  async ({ productList, totalPrice }) => {
    const token = getToken();
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };
    const userId = getUserId(); // Assuming you have userId in auth state

    // Convert totalPrice to a number
    const numericTotalPrice = parseFloat(totalPrice);

    try {
      const response = await axios.post(
        BASE_URL,
        {
          productList,
          totalPrice: numericTotalPrice,
          customerId: userId,
        },
        { headers },
      );
      return response.data; // Return the data property of the response
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
