import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

export const getProductById = createAsyncThunk(
  'product/getProductById',
  async (id: string, {getState, rejectWithValue}) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;

      const response = await axios.get(
        `http://13.60.250.124/user-inventory/get-inventory-by-id?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response);

      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response?.data || 'Failed to load product');
    }
  },
);

type ErrorType = string | null;

interface ProductState {
  product: any;
  loading: boolean;
  error: ErrorType;
}

const initialState: ProductState = {
  product: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProductById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getProductById.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.product = action.payload;
          state.loading = false;
        },
      )
      .addCase(getProductById.rejected, (state, action) => {
        state.error = action.payload as ErrorType;
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
