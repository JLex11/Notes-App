import { memo } from 'react';
import styles from '../styles/Note.module.css';

const BodyNote = ({content}) => {
  return (
    <div className={styles.NoteBody}>
      <p>{content}</p>
    </div>
  );
};

export default memo(BodyNote);
