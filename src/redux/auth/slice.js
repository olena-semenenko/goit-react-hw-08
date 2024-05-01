import { createSlice } from '@reduxjs/toolkit';
import { login, logout, refreshUser, register } from './operations';

const INITIAL_STATE = {
  user: {
    name: null,
    email: null,
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  isLoading: false,
  isError: false,
};
const thunkPending = state => {
  state.isLoading = true;
};
const thunkRejected = (state, action) => {
  state.isLoading = false;
  state.isError = action.payload;
};
const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  extraReducers: builder => {
    builder
      .addCase(register.pending, thunkPending)
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(register.rejected, thunkRejected)
      // login
      .addCase(login.pending, thunkPending)
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        // state.isRefreshing = true;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(login.rejected, thunkRejected)
      // logout
      .addCase(logout.pending, thunkPending)
      .addCase(logout.fulfilled, () => {
        return INITIAL_STATE;
      })
      .addCase(logout.rejected, thunkRejected)
      // refresh
      .addCase(refreshUser.pending, thunkPending)
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.isLoggedIn = true;
        state.isRefreshing = true;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(refreshUser.rejected, thunkRejected);
  },
});

//export reducer
export const authReducer = authSlice.reducer;
