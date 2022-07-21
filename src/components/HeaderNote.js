import { useDispatch, useSelector } from 'react-redux';
import { resetDropdown, setDropdown } from '../redux/actions/dropdownActions';
import { ActionButton } from './ActionButton';
import { Dropdown } from './Dropdown';

export const HeaderNote = (
  { dateFormatted, handleEditNote, isEditing, handleDelete }
) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const dropdown = useSelector(state => state.dropdown);
  
  const handleDropdown = () => {
    if (dropdown) dispatch(resetDropdown());
    else dispatch(setDropdown());
  };

  return (
    <div className='HeaderNote'>
      <div className='Date'>
        <span className='material-symbols-outlined'>history</span>
        <b>{dateFormatted}</b>
      </div>
      <Dropdown
        user={user}
        dropdown={dropdown}
        handleDropdown={handleDropdown}
      >
        <ActionButton handleClick={handleEditNote} label={'Edit'}>
          <span className='material-symbols-outlined'>
            {!isEditing ? 'edit' : 'undo'}
          </span>
        </ActionButton>
        {!isEditing && (
          <ActionButton handleClick={handleDelete} label={'Delete'}>
            <span className='material-symbols-outlined'>delete</span>
          </ActionButton>
        )}
      </Dropdown>
    </div>
  );
};