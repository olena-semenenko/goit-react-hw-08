import { useDispatch, useSelector } from 'react-redux';

import css from './SearchBox.module.css';
import { selectFilter } from '../../redux/filters/selectors';
import { changeFilter } from '../../redux/filters/slice';

const SearchBox = () => {
  const dispatch = useDispatch();
  const filterValue = useSelector(selectFilter);

  const handleFilter = e => {
    const filterValue = e.target.value;
    dispatch(changeFilter(filterValue));
  };

  return (
    <div className={css.searchBox}>
      <h4 className={css.subtitle}>Find contact by name</h4>
      <input
        className={css.searchInput}
        type="text"
        placeholder="Enter name..."
        value={filterValue}
        onChange={handleFilter}
      />
    </div>
  );
};

export default SearchBox;
