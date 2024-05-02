import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addContact, deleteContact, editContact, fetchContacts } from './operations';
import { logout } from '../auth/operations';

const INITIAL_STATE = {
  items: null,
  loading: false,
  error: null,
  currentContact: null,
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
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = state.items.filter(item => item.id !== action.payload.id);
      })
      .addCase(editContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = state.items.map(item =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(logout.fulfilled, () => {
        return INITIAL_STATE;
      })

      // all pendings
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          addContact.pending,
          deleteContact.pending,
          editContact.pending
        ),
        state => {
          state.loading = true;
          state.error = false;
        }
      )
      // all rejected
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          addContact.rejected,
          deleteContact.rejected,
          editContact.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

//export reducer
export const contactsReducer = contactsSlice.reducer;
export const { setCurrentContact } = contactsSlice.actions;
