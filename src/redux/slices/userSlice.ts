import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../constants/axiosInstance';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const getUser = createAsyncThunk(
  'user/getUser',
  async (_, {getState, rejectWithValue}) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;
      const {sub} = jwtDecode(token);

      const response = await axios.get(
        `http://13.60.250.124/users/find-user-by-id/${sub}`,
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
      return rejectWithValue(error.response?.data || 'Failed to load user');
    }
  },
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: any, {getState, rejectWithValue}) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;
      const {sub} = jwtDecode(token);
      console.log(data);
      const response = await axios.patch(
        `http://13.60.250.124/users/update/${sub}`,
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
      return rejectWithValue(error.response?.data || 'Failed to update user');
    }
  },
);

export const updateSupplier = createAsyncThunk(
  'user/updateUser',
  async (data: any, {getState, rejectWithValue}) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;
      const {sub} = jwtDecode(token);
      console.log(data);
      const response = await axios.patch(
        `http://13.60.250.124/suppliers/update-supplier/${sub}`,
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
      return rejectWithValue(error.response?.data || 'Failed to update user');
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.payload as ErrorType;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
