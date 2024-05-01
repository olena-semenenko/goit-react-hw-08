import { createSlice, isAnyOf } from '@reduxjs/toolkit';
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

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isRefreshing = true;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.isError = false;
      })
      // login
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isRefreshing = true;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.isError = false;
      })
      // logout
      .addCase(logout.fulfilled, () => {
        return INITIAL_STATE;
      })
      // refresh
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.isLoggedIn = true;
        state.isRefreshing = true;
        state.isLoading = false;
        state.isError = false;
      })

      // all pendings
      .addMatcher(
        isAnyOf(register.pending, login.pending, logout.pending, refreshUser.pending),
        state => {
          state.isLoading = true;
          state.isError = false;
        }
      )
      // all rejected
      .addMatcher(
        isAnyOf(register.rejected, login.rejected, logout.rejected, refreshUser.rejected),
        (state, action) => {
          state.isLoading = false;
          state.isError = action.payload;
        }
      );
  },
});

//export reducer
export const authReducer = authSlice.reducer;
