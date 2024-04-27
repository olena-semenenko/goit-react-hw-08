import { useDispatch } from 'react-redux';
import css from './Contact.module.css';
import { ImUser, ImMobile } from 'react-icons/im';
import { deleteContact } from '../../redux/contactsOps';

const Contact = ({ name, phone, id }) => {
  const dispatch = useDispatch();

  const handleBtnDelete = () => {
    const contactId = id;
    dispatch(deleteContact(contactId));
  };
  return (
    <div className={css.contactBox}>
      <span>
        <p className={css.name}>
          <ImUser className={css.icon} />
          {name}
        </p>
        <p className={css.number}>
          <ImMobile className={css.icon} /> {phone}
        </p>
      </span>

      <button className={css.button} type="button" onClick={handleBtnDelete}>
        Delete
      </button>
    </div>
  );
};

export default Contact;
