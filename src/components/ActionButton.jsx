import { memo } from 'react';
import styles from '../styles/ActionButton.module.css';

const ActionButton = ({ handleClick, label, children }) => {
  return (
    <div onClick={handleClick} className={styles.ActionButton}>
      {children}
      <span>{label}</span>
    </div>
  );
};

export default memo(ActionButton);
