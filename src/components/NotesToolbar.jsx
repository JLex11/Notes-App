import { memo, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useField } from '../hooks/useField';
import { searchFilter } from '../redux/actions/filterActions';
import styles from '../styles/NotesToolbar.module.css';
import FilterSelect from './FilterSelect';
import InputAutoExpand from './InputAutoExpand';
import NotesCounter from './NotesCounter';

const NotesToolbar = () => {
  const dispatch = useDispatch();

  const toolbarRef = useRef();
  const searchField = useField('search');

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (toolbarRef.current) {
        if (toolbarRef.current.getBoundingClientRect().top <= 0)
          toolbarRef.current.classList.add(styles.ToolbarSticky);
        else
          toolbarRef.current.classList.remove(styles.ToolbarSticky);
      }
    });
  }, []);

  const onChange = (event) => {
    searchField.onChange(event);
    dispatch(searchFilter(event.target.value));
  };

  return (
    <div className={styles.Toolbar} ref={toolbarRef}>
      <FilterSelect />
      <div className={styles.ContainerSearchBox}>
        <span className='material-symbols-outlined'>search</span>
        <InputAutoExpand
          type={searchField.type}
          placeholder={'Search note'}
          value={searchField.value}
          handleChange={onChange}
          size={searchField.value.length}
        />
      </div>
      <NotesCounter />
    </div>
  );
};

export default memo(NotesToolbar);