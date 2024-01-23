// tradesSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../../utils/userStorage';

const BASE_URL = `${process.env.REACT_APP_API_URL}/inventory`;

// Async thunk for fetching inventory
export const fetchInventory = createAsyncThunk(
  'inventory/fetchInventory',
  async (vendorId, thunkAPI) => {
    try {
      const token = getToken();
      const response = await axios.get(`${BASE_URL}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

// Async thunk for adding an inventory item
export const addInventoryItem = createAsyncThunk(
  'inventory/addInventoryItem',
  async (inventoryData, thunkAPI) => {
    try {
      const token = getToken();
      const response = await axios.post(BASE_URL, inventoryData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

// Async thunk for updating an inventory item
export const updateInventoryItem = createAsyncThunk(
  'inventory/updateInventoryItem',
  async ({ inventoryId, updatedData }, thunkAPI) => {
    try {
      const token = getToken();
      const response = await axios.put(
        `${BASE_URL}/${inventoryId}`,
        updatedData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const fetchInventoryById = createAsyncThunk(
  'inventory/fetchInventoryById',
  async (inventoryId, thunkAPI) => {
    try {
      const token = getToken();
      const response = await axios.get(`${BASE_URL}/${inventoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

// Async thunk for deleting an inventory item
export const deleteInventoryItem = createAsyncThunk(
  'inventory/deleteInventoryItem',
  async (inventoryId, thunkAPI) => {
    try {
      const token = getToken();
      await axios.delete(`${BASE_URL}/${inventoryId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return inventoryId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

// Define the inventory slice
const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    items: [],
    loading: false,
    error: null,
    selectedItem: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Reducer for fetchInventory
    builder.addCase(fetchInventory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchInventory.fulfilled, (state, action) => {
      console.log('Fetched inventory data:', action.payload);
      state.loading = false;
      state.items = action.payload;
    });

    builder.addCase(fetchInventory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Reducer for addInventoryItem
    builder.addCase(addInventoryItem.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
    builder.addCase(addInventoryItem.rejected, (state, action) => {
      state.error = action.payload;
    });

    // Reducer for updateInventoryItem
    builder.addCase(updateInventoryItem.fulfilled, (state, action) => {
      const updatedItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (updatedItemIndex !== -1) {
        state.items[updatedItemIndex] = action.payload;
      }
    });
    builder.addCase(updateInventoryItem.rejected, (state, action) => {
      state.error = action.payload;
    });

    // Reducer for deleteInventoryItem
    builder.addCase(deleteInventoryItem.fulfilled, (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    });
    builder.addCase(deleteInventoryItem.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(fetchInventoryById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchInventoryById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedItem = action.payload;
    });
    builder.addCase(fetchInventoryById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default inventorySlice.reducer;
