import { memo } from 'react';
import styles from '../styles/NoteForm.module.css';

const InputAutoExpand = ({type, placeholder, value, handleChange, size}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className={styles.FormInputAutoExpand}
      size={size}
    />
  );
};

export default memo(InputAutoExpand);