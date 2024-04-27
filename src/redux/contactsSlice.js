import { createSelector, createSlice } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from './contactsOps';
import { selectNameFilter } from './filtersSlice';

const INITIAL_STATE = {
  items: [],
  loading: false,
  error: null,
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
      .addCase(deleteContact.rejected, thunkRejected);
  },
});

//export reducer
export const contactsReducer = contactsSlice.reducer;

//export state selector
export const selectContacts = state => state.contacts.items;
export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;

// filtered contacts
const selectFilter = state => state.filters.name;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (items, name) => {
    const filteredContacts = items.filter(contact =>
      contact.name.toLowerCase().includes(name.toLowerCase())
    );
    return filteredContacts;
  }
);
