import { createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, editContact, fetchContacts } from './operations';

const INITIAL_STATE = {
  items: null,
  loading: false,
  error: null,
  currentContact: null,
};
const thunkPending = state => {
  state.loading = true;
};
const thunkRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentContact(state, action) {
      state.currentContact = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, thunkPending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, thunkRejected)
      .addCase(addContact.pending, thunkPending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, thunkRejected)
      .addCase(deleteContact.pending, thunkPending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = state.items.filter(item => item.id !== action.payload.id);
      })
      .addCase(deleteContact.rejected, thunkRejected)
      .addCase(editContact.pending, thunkPending)
      .addCase(editContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = state.items.map(item =>
          item.name !== action.payload.name ? action.payload : item
        );
      })
      .addCase(editContact.rejected, thunkRejected);
  },
});

//export reducer
export const contactsReducer = contactsSlice.reducer;
export const { setCurrentContact } = contactsSlice.actions;
