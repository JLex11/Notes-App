import { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetUser } from '../redux/actions/userActions';
import notesRequest from '../services/notesRequest';
import styles from '../styles/Header.module.css';
import ActionButton from './ActionButton';
import Dropdown from './Dropdown';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const [ dropdown, setDropdown ] = useState(false);

  const handleDropdown = useCallback(() => {
    setDropdown(!dropdown);
  }, [dropdown, setDropdown]);

  const handleLogout = useCallback(() => {
    dispatch(resetUser());
    setDropdown(false);
    localStorage.removeItem('loggedNoteAppUser');
    notesRequest.setToken(null);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.HeaderBar}>
      {user ? (
        <>
          <div>
            <ActionButton label={user.name}>
              <span className='material-symbols-outlined'>account_circle</span>
            </ActionButton>
          </div>
          <div>
            <div className={styles.HeaderUserOptions}>
              <Dropdown
                user={user}
                icon={'more_vert'}
                dropdown={dropdown}
                handleDropdown={handleDropdown}
              >
                <ActionButton label={'Logout'} handleClick={handleLogout}>
                  <span className={`material-symbols-outlined ${styles.LogOut}`}>logout</span>
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

export default memo(Header);