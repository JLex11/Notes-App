import { ActionButton } from './ActionButton';
import { Dropdown } from './Dropdown';

export const HeaderNote = (
  { dateFormatted, user, dropdown, handleDropdown, handleEditNote, isEditing, handleDelete }
) => {
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