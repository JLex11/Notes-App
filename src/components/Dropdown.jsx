import { motion } from 'framer-motion';
import { memo } from 'react';
import styles from '../styles/Dropdown.module.css';

const Dropdown = ({ user, icon, dropdown, handleDropdown, children }) => {

  const motionInitial = {
    opacity: 0,
    y: -50,
    scale: 0.5,
  };

  const motionAnimate = {
    y: 0,
    scale: 1,
    opacity: 1,
  };

  return (
    <>
      {user ? (
        <span
          className={`${styles.DropdownIconLauncher} material-symbols-outlined`}
          onClick={handleDropdown}
          style={{ transform: dropdown ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >{icon || 'expand_more'}
        </span>
      ) : null}
      {dropdown && (
        <motion.div
          initial={motionInitial}
          animate={motionAnimate}
          className={styles.DropdownMenu}>
          {children}
        </motion.div>
      )}
    </>
  );
};

export default memo(Dropdown);