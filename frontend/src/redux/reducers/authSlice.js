import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  isAdmin:false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.loading = true;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.isAdmin = action.payload.isAdmin;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
  },
});


export const { setLoading, setAuthenticated, setError, logout } = authSlice.actions;
export default authSlice.reducer;
