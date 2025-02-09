import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "./actions/loginUser.auth";
import { loadAuth } from "./actions/load.auth";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
      isAuthenticated: false,
      isAuthLoading: true,
      user: null,
      token: null,
      error: null
    },
    reducers: {
      logout: (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        AsyncStorage.removeItem('token');
        AsyncStorage.removeItem('userData');
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          state.isAuthLoading = true;
          state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.isAuthLoading = false;
          state.isAuthenticated = true;
          state.user = action.payload.user;
          state.token = action.payload.token;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.isAuthLoading = false;
          state.error = action.error.message;
        })
        .addCase(loadAuth.pending, (state) => {
          state.isAuthLoading = true;
        })
        .addCase(loadAuth.fulfilled, (state, action) => {
          state.isAuthLoading = false;
          if (action.payload) {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
          }
        })
    }
  });
  
  export const { logout } = authSlice.actions;
  export default authSlice.reducer;
  