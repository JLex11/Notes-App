import { memo, useEffect, useRef } from 'react';
import styles from '../styles/NotesToolbar.module.css';
import FilterSelect from './FilterSelect';
import NotesCounter from './NotesCounter';

const NotesToolbar = () => {
  const toolbarRef = useRef();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (toolbarRef.current) {
        if (toolbarRef.current.getBoundingClientRect().top <= 0) {
          toolbarRef.current.classList.add(styles.ToolbarSticky);
        } else {
          toolbarRef.current.classList.remove(styles.ToolbarSticky);
        }
      }
    });
  }, []);

  return (
    <div className={styles.Toolbar} ref={toolbarRef}>
      <div className={styles.ToolbarLeft}>
        <FilterSelect />
      </div>
      <div className={styles.ToolbarRight}>
        <NotesCounter />
      </div>
    </div>
  );
};

export default memo(NotesToolbar);