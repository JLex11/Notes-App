import { memo, useRef } from 'react';
import styles from '../styles/NotesToolbar.module.css';
import FilterSelect from './FilterSelect';
import NotesCounter from './NotesCounter';

const NotesToolbar = () => {
  const toolbarRef = useRef();

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