import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useNotes } from '../hooks/useNotes';
import styles from '../styles/Select.module.css';

const FilterSelect = () => {
  const filter = useSelector(state => state.filter);
  const notes = useNotes();

  const handleChangeSelect = (e) => {
    const { value } = e.target;
    notes.setSelectedFilter(value);
  };

  const handleChangeOrder = () => {
    if (filter.order === 'asc') notes.setOrder('desc');
    else notes.setOrder('asc');
  };

  return (
    <div className={styles.FilterContainer}>
      {filter?.filters ? (
        <select
          onChange={handleChangeSelect}
          className={styles.FilterSelect}
          defaultValue={filter.selected[0]}
        >
          {filter.filters.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>) : null}
      <button onClick={handleChangeOrder} className={styles.OrderButton}>
        <span className='material-symbols-outlined'>sort_by_alpha</span>
      </button>
    </div>
  );
};

export default memo(FilterSelect);