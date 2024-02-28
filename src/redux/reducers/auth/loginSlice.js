/* eslint-disable no-console */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_API_AUTH_URL}/login/`;

const initialState = {
  status: 'idle',
  userInfo: {},
  error: null,
  token: '',
};

export const loginUser = createAsyncThunk(
  'login/loginUser',
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(BASE_URL, user, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (response.headers?.authorization) {
        localStorage.setItem(
          'token',
          JSON.stringify(response.headers.authorization.split(' ')[1]),
        );
      }
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
  reducers: {
    login: (state, action) => {
      state.status = 'success';
      state.action = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'success';
        state.userInfo = action.payload;

        console.log('Login successful. Token:', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload;

        console.error('Login failed. Error:', payload);
      });
  },
});

export const { login } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
