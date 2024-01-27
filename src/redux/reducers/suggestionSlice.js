import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from '../../utils/userStorage';

const BASE_URL = `${process.env.REACT_APP_API_URL}/analytic/suggestion/user/`;

// Define the initial state
const initialState = {
  categories: [],
  status: 'idle',
  error: null,
};

// Define the async thunk to fetch user suggestions
export const fetchUserSuggestions = createAsyncThunk(
  'suggestion/fetchUserSuggestions',
  async (userId) => {
    const token = getToken();
    const url = `${BASE_URL}${userId}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Add any other headers as needed
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('API Response:', data);
    return data.categories;
  }
);

// Create the suggestion slice
const suggestionSlice = createSlice({
  name: 'suggestion',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSuggestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserSuggestions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchUserSuggestions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default suggestionSlice.reducer;
