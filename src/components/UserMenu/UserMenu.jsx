import { useDispatch, useSelector } from 'react-redux';
import css from './UserMenu.module.css';
import { selectUser } from '../../redux/auth/selectors';
import { logout } from '../../redux/auth/operations';
const UserMenu = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const handdleLogoutBtn = () => {
    dispatch(logout());
  };
  return (
    <div className={css.user_info}>
      <p className={css.user_name}>Welcome, {user.name} </p>
      <button onClick={handdleLogoutBtn} type="button" className={css.logout_btn}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
