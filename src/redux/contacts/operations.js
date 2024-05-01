import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { instance } from '../auth/operations';
import { useSelector } from 'react-redux';
import { selectToken } from '../auth/selectors';

// api GET

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async (_, thunkAPI) => {
  try {
    const { data } = await instance.get('/contacts');

    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});
// api POST
export const addContact = createAsyncThunk('contacts/addContact', async (newContact, thunkAPI) => {
  try {
    const { data } = await instance.post('/contacts', newContact);

    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});
// api DELETE
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      const { data } = await instance.delete(`/contacts/${contactId}`);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
// api PATCH

export const editContact = createAsyncThunk(
  'contacts/editContact',
  async ({ id, ...updateContact }, thunkAPI) => {
    try {
      const { data } = await instance.patch(`/contacts/${id}`, updateContact);

      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
