import { useSelector } from 'react-redux';
import Contact from '../Contact/Contact';
import { selectFilteredContacts } from '../../redux/contactsSlice';

import css from './ContactList.module.css';

const ContactList = () => {
  const filteredContacs = useSelector(selectFilteredContacts);
  return (
    <ul className={css.contactList}>
      {filteredContacs.map(contact => (
        <li className={css.contackItem} key={contact.id}>
          <Contact name={contact.name} phone={contact.number} id={contact.id} />
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
