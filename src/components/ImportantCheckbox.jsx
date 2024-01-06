import { memo } from 'react';
import styles from '../styles/ImportantCheckbox.module.css';

const ImportantCheckbox = ({ id, newImportant, handleImportantChange}) => {
  if (!id) id = Math.random() * 1000;

  return (
    <label htmlFor={`checkbox-${id}`} className={styles.ImportantConfig}>
      <h5>Important</h5>
      <input
        type="checkbox"
        id={`checkbox-${id}`}
        style={{ display: 'none' }}
        checked={newImportant}
        onChange={e => handleImportantChange(e)}
      />
      <span className="material-symbols-outlined">
        {newImportant
          ? 'select_check_box'
          : 'check_box_outline_blank'}
      </span>
    </label>
  );
};

export default memo(ImportantCheckbox);
