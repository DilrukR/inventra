import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../constants/axiosInstance';
import axios from 'axios';
export interface AuthState {
  token: string | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

interface LoginResponse {
  accessToken: string;
}

interface RegisterResponse {
  messege: string;
}

export const login = createAsyncThunk(
  'auth/login',
  async (
    {email, password}: {email: string; password: string},
    {rejectWithValue},
  ) => {
    try {
      const response = await axios.post<LoginResponse>(
        `http://13.60.250.124/auth/login`,
        {
          email,
          password,
        },
      );

      console.log(response.data);

      console.log(response);

      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  },
);

export const registerSupplier = createAsyncThunk(
  'auth/register',
  async (
    {
      firstName,
      lastName,
      password,
      email,
      phone,
      address,
      deviceToken,
    }: {
      firstName: string;
      lastName: string;
      password: string;
      email: string;
      phone: string;
      address: string;
      deviceToken: string;
    },
    {rejectWithValue},
  ) => {
    try {
      const response = await axios.post(
        `http://13.60.250.124/suppliers/create-supplier`,
        {
          firstName,
          lastName,
          password,
          email,
          phone,
          address,
          role: 'supplier',
          status: 'active',
          deviceToken,
        },
      );

      console.log(response.data);

      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.message || 'register failed',
      );
    }
  },
);

export const supplierLogin = createAsyncThunk(
  'auth/login',
  async (
    {email, password}: {email: string; password: string},
    {rejectWithValue},
  ) => {
    console.log(email, password);
    try {
      const response = await axios.post<LoginResponse>(
        `http://13.60.250.124/auth/supplier-login`,
        {
          email,
          password,
        },
      );

      console.log(response.data);

      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  },
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    {
      firstName,
      lastName,
      password,
      email,
      phone,
      address,
    }: {
      firstName: string;
      lastName: string;
      password: string;
      email: string;
      phone: string;
      address: string;
    },
    {rejectWithValue},
  ) => {
    try {
      const response = await axios.post(
        `http://13.60.250.124:3000/users/create-user`,
        {
          firstName,
          lastName,
          password,
          email,
          phone,
          address,
          role: 'user',
        },
      );

      console.log(response.data);

      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.message || 'register failed',
      );
    }
  },
);

const initialState: AuthState = {
  token: null,
  status: 'idle',
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'idle';
        state.token = action.payload.accessToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Login failed';
      });
  },
});

export default authSlice.reducer;
