import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../redux/auth/selectors';

const Navigation = () => {
  const IsLoggedIn = useSelector(selectIsLoggedIn);
  const activePage = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
  return (
    <header>
      <nav className={css.nav_menu}>
        <NavLink to="/" className={activePage}>
          Home
        </NavLink>
        {IsLoggedIn && (
          <NavLink to="/contacts" className={activePage}>
            Contacts
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Navigation;
