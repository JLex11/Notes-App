import { memo } from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/NotesCounter.module.css';

const NotesCounter = () => {
  const notesLenght = useSelector(state => state.notes.length);

  return (
    <div className={styles.NotesCounter}>
      <span>Notes</span>
      <span>{notesLenght}</span>
    </div>
  );
};

export default memo(NotesCounter);