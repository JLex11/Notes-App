import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Note from './Note';

const Notes = () => {
  const notes = useSelector(state => state.notes);
  const filterSelected = useSelector(state => state.filter.selected);

  const sortCondition = useCallback((a, b, noteKey = 'date', increment = 'desc') => {
    if (a[noteKey] > b[noteKey]) return increment === 'desc' ? -1 : 1;
    if (a[noteKey] < b[noteKey]) return increment === 'desc' ? 1 : -1;
    return 0;
  }, []);

  return (
    <div className='Notes'>
      {notes.sort((a, b) => sortCondition(a, b, filterSelected, 'desc'))
        .map((note, i) =>
          <Note
            key={note.id}
            note={note}
            timeTransition={'0.' + i}
          />
        )}
    </div>
  );
};

export default memo(Notes);