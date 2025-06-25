import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async thunks for authentication
export const signup = createAsyncThunk(
  'auth/signup',
  async ({ shopName, email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/signup', { shopName, email, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
);

export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/verify-otp', { email, otp });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'OTP verification failed');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, shopName } = response.data;
      
      // Store token in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('shopName', shopName);
      
      return { token, shopName };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    localStorage.removeItem('token');
    localStorage.removeItem('shopName');
    return {};
  }
);

// Check if user is already logged in (on app startup)
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const shopName = localStorage.getItem('shopName');
      
      if (!token) {
        throw new Error('No token found');
      }
      
      // Optionally verify token with backend
      // const response = await api.get('/auth/verify-token');
      
      return { token, shopName };
    } catch (error) {
      localStorage.removeItem('token');
      localStorage.removeItem('shopName');
      return rejectWithValue('Authentication check failed');
    }
  }
);

const initialState = {
  user: null,
  token: null,
  shopName: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  signupStep: 'signup', // 'signup', 'verify-otp', 'complete'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSignupStep: (state, action) => {
      state.signupStep = action.payload;
    },
    resetAuth: (state) => {
      state.user = null;
      state.token = null;
      state.shopName = null;
      state.isAuthenticated = false;
      state.error = null;
      state.signupStep = 'signup';
    },
  },
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.signupStep = 'verify-otp';
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Verify OTP
      .addCase(verifyOTP.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.loading = false;
        state.signupStep = 'complete';
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.shopName = action.payload.shopName;
        state.isAuthenticated = true;
        state.signupStep = 'signup'; // Reset signup step
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.shopName = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      
      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.shopName = action.payload.shopName;
        state.isAuthenticated = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      });
  },
});

export const { clearError, setSignupStep, resetAuth } = authSlice.actions;
export default authSlice.reducer;
