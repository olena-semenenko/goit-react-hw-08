import { useDispatch, useSelector } from 'react-redux';
import ContactForm from '../../components/ContactForm/ContactForm';
import Loader from '/src/components/Loader/Loader';

import css from './ContactsPage.module.css';
import { selectContacts, selectLoading } from '../../redux/contacts/selectors';
import { useEffect, useState } from 'react';
import { fetchContacts } from '../../redux/contacts/operations';
import ContactList from '../../components/ContactList/ContactList';
import SearchBox from '/src/components/SearchBox/SearchBox';
import { Toaster } from 'react-hot-toast';

import ModalDelete from '../../components/ModalDelete/ModalDelete';
import ModalEdit from '../../components/ModalEdit/ModalEdit';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);

  const contacts = useSelector(selectContacts);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  const [visibleForm, setVisibleForm] = useState(false);
  const [visibleBtn, setVisibleBtn] = useState(true);
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);
  const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
  const onContactBtn = () => {
    setVisibleForm(!visibleForm);
    setVisibleBtn(!visibleBtn);
  };
  function openModalDelete() {
    setModalDeleteIsOpen(true);
  }

  function closeModalDelete() {
    setModalDeleteIsOpen(false);
  }
  function openModalEdit() {
    setModalEditIsOpen(true);
  }
  function closeModalEdit() {
    setModalEditIsOpen(false);
  }

  return (
    <div className={css.container}>
      <div>
        <Toaster position="top-center" />
      </div>
      <div className={css.contact_form}>
        {visibleBtn && (
          <button className={css.button} type="button" onClick={onContactBtn}>
            ➕ Add New Contact
          </button>
        )}

        {visibleForm && <ContactForm onSubmit={onContactBtn} />}
      </div>
      <div>
        <h2 className={css.subtitle}>Current list of your contacts</h2>
        <div>{loading && <Loader />}</div>
        <SearchBox />
        <div>
          {Array.isArray(contacts) && (
            <ContactList openModalDelete={openModalDelete} openModalEdit={openModalEdit} />
          )}
        </div>
        <div>
          {Array.isArray(contacts) && contacts.length === 0 && (
            <p className={css.subtitle}>No contacts found</p>
          )}
        </div>
      </div>
      <ModalDelete
        onOpenButton={openModalDelete}
        isOpen={modalDeleteIsOpen}
        onRequestClose={closeModalDelete}
      />
      <ModalEdit
        onOpenButton={openModalEdit}
        isOpen={modalEditIsOpen}
        onRequestClose={closeModalEdit}
      />
    </div>
  );
};

export default ContactsPage;
