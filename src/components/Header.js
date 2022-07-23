import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '../redux/actions/userActions';
import notesRequest from '../services/notesRequest';
import { ActionButton } from './ActionButton';
import { Dropdown } from './Dropdown';

export const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const [ dropdown, setDropdown ] = useState(false);

  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleLogout = () => {
    dispatch(resetUser());
    setDropdown(false);
    localStorage.removeItem('loggedNoteAppUser');
    notesRequest.setToken(null);
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
                <ActionButton label={'Logout'} handleClick={handleLogout}>
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
