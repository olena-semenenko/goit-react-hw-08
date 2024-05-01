import { useDispatch } from 'react-redux';
import css from './Contact.module.css';
import { ImUser, ImMobile } from 'react-icons/im';
import { setCurrentContact } from '../../redux/contacts/slice';

const Contact = ({ name, phone, id, openModalDelete, openModalEdit }) => {
  const dispatch = useDispatch();
  const currentContact = {
    id,
    name,
    phone,
  };
  const handleBtnDelete = () => {
    dispatch(setCurrentContact(currentContact));

    openModalDelete();
  };
  const handleBtnEdit = () => {
    dispatch(setCurrentContact(currentContact));

    openModalEdit();
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
      <ul className={css.list_btn}>
        <li>
          <button className={css.btn} type="button" onClick={handleBtnEdit}>
            Edit name
          </button>
        </li>
        <li>
          <button className={css.btn} type="button" onClick={handleBtnDelete}>
            Delete
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Contact;
