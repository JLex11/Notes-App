import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/Notes.module.css';
import Note from './Note';
import { useNotes } from '../hooks/useNotes';

const Notes = () => {
  const notesF = useNotes();
  
  useEffect(() => notesF.init(), []); // eslint-disable-line react-hooks/exhaustive-deps

  const notes = useSelector(state => state.notes);
  const filterSelected = useSelector(state => state.filter.selected);
  const filterOrder = useSelector(state => state.filter.order);

  const sortCondition = useCallback((a, b, noteKey = 'date', increment = 'desc') => {
    if (a[noteKey] > b[noteKey])
      return increment === 'desc' ? -1 : 1;
    if (a[noteKey] < b[noteKey])
      return increment === 'desc' ? 1 : -1;
    return 0;
  }, []);

  return (
    <div className={styles.Notes}>
      {notes.sort((a, b) =>
        sortCondition(a, b, filterSelected, filterOrder))
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