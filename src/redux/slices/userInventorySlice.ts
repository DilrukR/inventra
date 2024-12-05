import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axiosInstance from '../../constants/axiosInstance';
import axios from 'axios';

interface UserInventoryState {
  userInventory: any[]; // Array to store the inventory items
  loading: boolean;
  error: string | null;
  hasNextPage: boolean; // Tracks if there are more pages to fetch
}

const initialState: UserInventoryState = {
  userInventory: [],
  loading: false,
  error: null,
  hasNextPage: true,
};

export const updateInventory = createAsyncThunk(
  'userInventory/updateInventory',
  async (
    data: {quantity: number; productId: string},
    {getState, rejectWithValue},
  ) => {
    const state = getState() as any;
    const token = state.auth.token; // Retrieve the token from the state

    console.log(data);

    try {
      // Construct the API endpoint using productId
      const response = await axios.patch(
        `http://13.60.250.124/user-inventory/${data.productId}`,
        {quantity: data.quantity}, // Send quantity in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in headers
          },
        },
      );

      console.log(response.data);

      return response.data; // Return the response data
    } catch (error: any) {
      // Handle errors and return the appropriate value
      return rejectWithValue(
        error.response?.data || 'Failed to update inventory',
      );
    }
  },
);

export const getUserInventory = createAsyncThunk(
  'userInventory/getUserInventory',
  async (
    {page, limit}: {page: number; limit: number},
    {rejectWithValue, getState},
  ) => {
    const state = getState() as any;
    const token = state.auth.token;

    try {
      const response = await axiosInstance.get(
        `user-inventory/get-all-inventory`,
        {
          params: {page, limit},
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Failed to load user inventory',
      );
    }
  },
);

const userInventorySlice = createSlice({
  name: 'userInventory',
  initialState,
  reducers: {
    resetInventory: state => {
      state.userInventory = [];
      state.hasNextPage = true;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUserInventory.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserInventory.fulfilled, (state, action) => {
        const newItems = action.payload.data; // Fetched items
        const existingItems = state.userInventory || [];
        state.userInventory = [
          ...existingItems.filter(
            item => !newItems.some(newItem => newItem.id === item.id),
          ),
          ...newItems,
        ];
        state.hasNextPage = action.payload.hasNextPage;
        state.loading = false;
      })
      .addCase(getUserInventory.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const {resetInventory} = userInventorySlice.actions;
export default userInventorySlice.reducer;
