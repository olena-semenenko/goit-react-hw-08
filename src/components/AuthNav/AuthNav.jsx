import { NavLink } from 'react-router-dom';
import css from './AuthNav.module.css';
import clsx from 'clsx';

const AuthNav = () => {
  const activePage = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <div className={css.auth_links}>
      <NavLink to="/register" className={activePage}>
        Register
      </NavLink>
      <NavLink to="/login" className={activePage}>
        Log In
      </NavLink>
    </div>
  );
};

export default AuthNav;
