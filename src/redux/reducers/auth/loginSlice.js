import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_API_AUTH_URL}/api/v1/auth/login`;

const initialState = {
  status: 'idle',
  userInfo: {},
  error: null,
};

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(BASE_URL, user, {
        headers: { 'Content-Type': 'application/json' },
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.userInfo = action.payload;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;
      });
  },
});

export const { login } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
