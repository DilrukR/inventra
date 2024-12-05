import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
export const createSupplierInventory = createAsyncThunk(
  'supplierInventory/createSupplierInventory',
  async (data: any, {getState, rejectWithValue}) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;
      const {sub, email} = jwtDecode(token);
      const response = await axios.post(
        `http://13.60.250.124/user-inventory/create-inventory`,
        {
          productName: data.productName,
          description: data.description,
          quantity: data.quantity,
          price: data.price,
          priority: 1,
          createdDate: new Date().toISOString(),
          updatedDate: new Date().toISOString(),
          status: data.status,
          category: data.category,
          image: data.image,
          supplierId: sub,
          isUser: 'no',
          supplier: email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || 'Failed to create supplier inventory',
      );
    }
  },
);

const initialState = {
  supplierInventory: [],
  loading: false,
  error: null,
};

const supplierInventorySlice = createSlice({
  name: 'supplierInventory',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createSupplierInventory.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSupplierInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.supplierInventory.push(action.payload);
      })
      .addCase(createSupplierInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

      .
  },
});

export default supplierInventorySlice.reducer;
