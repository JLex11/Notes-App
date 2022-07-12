import { useState } from 'react';

export const Dropdown = ({ user, icon, children }) => {
  const [dropdown, setDropdown] = useState(false);

  const handleDropdown = () => {
    if (dropdown) setDropdown(false);
    else setDropdown(true);
  };

  return (
    <>
      {user ? (
        <span
          className='material-symbols-outlined'
          onClick={handleDropdown}
          style={{ transform: dropdown ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >{icon || 'expand_more'}
        </span>
      ) : null}
      {dropdown && (
        <div className="DropdownMenu">
          {children}
        </div>
      )}
    </>
  );
};