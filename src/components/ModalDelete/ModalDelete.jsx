import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import toast from 'react-hot-toast';
import { selectCurrentContact } from '../../redux/contacts/selectors';
import css from './ModalDelete.module.css';
import clsx from 'clsx';

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(57, 55, 55, 0.75)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#root');
const ModalDelete = ({ isOpen, onRequestClose, onOpenButton }) => {
  const dispatch = useDispatch();
  const currentContact = useSelector(selectCurrentContact);
  const confirmDelete = () => {
    dispatch(deleteContact(currentContact.id));
    onRequestClose();
    toast.success('Contact successfully deleted');
  };
  const rejectDelete = () => {
    onRequestClose();
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        contentLabel="Modal"
      >
        <div className={css.modal}>
          <p className={css.text}>Are you sure want to delete contact?</p>
          <ul className={css.btn_list}>
            <li>
              <button type="button" onClick={confirmDelete} className={clsx(css.btn, css.confirm)}>
                Yes
              </button>
            </li>
            <li>
              <button type="button" onClick={rejectDelete} className={clsx(css.btn, css.regect)}>
                No
              </button>
            </li>
          </ul>
        </div>
      </Modal>
    </div>
  );
};
export default ModalDelete;
