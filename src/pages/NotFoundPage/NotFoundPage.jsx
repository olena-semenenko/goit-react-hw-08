import { Link } from 'react-router-dom';
import NotFoundPageImage from '/src/images/NotFoundPage.png';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={css.container}>
      <img src={NotFoundPageImage} alt="NotFoundPage" />
      <Link className={css.link} to={'/'} replace={true}>
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
