import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../constants/axiosInstance';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (data: any, {getState, rejectWithValue}) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;

      console.log(data);

      const response = await axios.post(
        `http://13.60.250.124:3000/user-orders/place-order`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response?.data || 'Failed to create order');
    }
  },
);

export const getOrder = createAsyncThunk(
  'order/getOrder',
  async (_, {getState, rejectWithValue}) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;

      const userId = state.user.user.id;

      console.log('test', userId);

      const response = await axios.get(
        `http://13.60.250.124:3000/user-orders/get-order-by-user-id/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {}
  },
);

export const getsupplierOrders = createAsyncThunk(
  'order/getsupplierOrders',
  async (_, {getState, rejectWithValue}) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;

      const supplierId = jwtDecode(token).sub;

      console.log('test', supplierId);

      const response = await axios.get(
        `http://13.60.250.124:3000/user-orders/get-order-by-supplier-id/${supplierId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);
      return response.data;
    } catch (error: any) {}
  },
);

export const updateOrder = createAsyncThunk(
  'order/updateOrder',
  async (
    {orderId, status}: {orderId: string; status: string},
    {getState, rejectWithValue},
  ) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;

      const response = await axios.post(
        `http://13.60.250.124:3000/user-orders/update-order/${orderId}`,
        {status},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error updating order:', error);
      return rejectWithValue(error.response?.data || 'Failed to update order');
    }
  },
);

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    order: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getOrder.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.order = action.payload;
        state.loading = false;
      })

      .addCase(getsupplierOrders.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getsupplierOrders.fulfilled, (state, action) => {
        state.order = action.payload;
        state.loading = false;
      })
      .addCase(getsupplierOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
