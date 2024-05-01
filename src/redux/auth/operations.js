import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const instance = axios.create({
  baseURL: 'https://connections-api.herokuapp.com',
});

export const setToken = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => (instance.defaults.headers.common.Authorization = '');

//create new user
export const register = createAsyncThunk('auth/register', async (formData, thunkAPI) => {
  try {
    const { data } = await instance.post('/users/signup', formData);

    setToken(data.token);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});

//login user
export const login = createAsyncThunk('auth/login', async (formData, thunkAPI) => {
  try {
    const { data } = await instance.post('/users/login', formData);

    setToken(data.token);
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});
// logout
export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await instance.post('/users/logout');

    clearToken();
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});
// refresh in APP
export const refreshUser = createAsyncThunk('auth/refresh', async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.auth.token;

    setToken(token);
    const { data } = await instance.get('/users/current');
    console.log('refresh', data);

    return data;
  } catch (e) {
    return thunkApi.rejectWithValue(e.message);
  }
});
