import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../../utils/userStorage';

const baseUrl = process.env.REACT_APP_API_URL;
const initialState = {
  trade: null,
  loading: false,
  error: null,
};

export const fetchTradeDetails = createAsyncThunk(
  'tradeDetails/fetchTradeDetails',
  async (tradeId) => {
    const token = getToken();
    const response = await axios.get(`${baseUrl}/product/${tradeId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
);

const tradeDetailsSlice = createSlice({
  name: 'tradeDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTradeDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTradeDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.trade = action.payload;
      })
      .addCase(fetchTradeDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default tradeDetailsSlice.reducer;
