import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact';

import css from './ContactList.module.css';
import { selectFilteredContacts } from '../../redux/contacts/selectors';

const ContactList = ({ openModalDelete, openModalEdit }) => {
  const filteredContacs = useSelector(selectFilteredContacts);
  return (
    <ul className={css.contactList}>
      {filteredContacs.map(contact => (
        <li className={css.contackItem} key={contact.id}>
          <Contact
            name={contact.name}
            phone={contact.number}
            id={contact.id}
            openModalDelete={openModalDelete}
            openModalEdit={openModalEdit}
          />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
