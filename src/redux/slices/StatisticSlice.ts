import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInstance from '../../constants/axiosInstance';

export const getStatistic = createAsyncThunk(
  'statistic/getStatistic',
  async (_, {getState, rejectWithValue}) => {
    try {
      const state = getState() as any;
      const token = state.auth.token;
      const response = await axiosInstance.get(`/user-inventory/statistics`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      return response.data;
    } catch (error: any) {}
  },
);

export const StatisticSlice = createSlice({
  name: 'statistic',
  initialState: {
    statistic: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getStatistic.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStatistic.fulfilled, (state, action: PayloadAction<any>) => {
        state.statistic = action.payload;
        state.loading = false;
      })
      .addCase(getStatistic.rejected, (state, action) => {
        state.error = action.payload as ErrorType;
        state.loading = false;
      });
  },
});

export default StatisticSlice.reducer;
