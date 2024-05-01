import { createSelector } from '@reduxjs/toolkit';

//export state selector
export const selectContacts = state => state.contacts.items;
export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;
export const selectCurrentContact = state => state.contacts.currentContact;

// filtered contacts
const selectFilter = state => state.filters.name;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilter],
  (items, name) => {
    const filteredContacts = items.filter(
      contact =>
        contact.name.toLowerCase().includes(name.toLowerCase()) ||
        contact.number.toLowerCase().includes(name.toLowerCase())
    );
    return filteredContacts;
  }
);
