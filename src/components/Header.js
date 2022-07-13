import { useState } from 'react';
import { ActionButton } from './ActionButton';
import { Dropdown } from './Dropdown';

export const Header = headers => {
  const { user, handleLogout } = headers;
  const [ dropdown, setDropdown ] = useState(false);

  const handleDropdown = () => {
    if (dropdown) setDropdown(false);
    else setDropdown(true);
  };

  const handleLogoutClick = () => {
    setDropdown(false);
    handleLogout();
  };

  return (
    <div className='HeaderBar'>
      {user ? (
        <>
          <div>
            <ActionButton label={user.name}>
              <span className='material-symbols-outlined'>account_circle</span>
            </ActionButton>
          </div>
          <div>
            <div className='HeaderUserOptions'>
              <Dropdown
                user={user}
                icon={'more_vert'}
                dropdown={dropdown}
                handleDropdown={handleDropdown}
              >
                <ActionButton label={'Logout'} handleClick={handleLogoutClick}>
                  <span className='material-symbols-outlined'>logout</span>
                </ActionButton>
              </Dropdown>
            </div>
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
};
