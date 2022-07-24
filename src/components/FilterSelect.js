import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useNotes } from '../hooks/useNotes';

const FilterSelect = () => {
  const filter = useSelector(state => state.filter);
  const notes = useNotes();

  const handleChange = (e) => {
    const { value } = e.target;
    notes.setSelectedFilter(value);
  };

  return (
    <div>
      {filter?.filters ? (
        <select onChange={handleChange} selected={filter.selected}>
          {filter.filters.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>) : null}
    </div>
  );
};

export default memo(FilterSelect);