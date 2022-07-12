import { Dropdown } from './Dropdown';
import { NoteActionButton } from './NoteActionButton';

export const Header = (headers) => {
  const {user, handleLogout} = headers;

  return (
    <div className="HeaderBar">
      <div></div>
      <div>
        {user ? (
          <>
            <div className='HeaderUserOptions'>
              <span className='material-symbols-outlined'>account_circle</span>
              <span>{user.name}</span>
              <Dropdown user={user}>
                <NoteActionButton label={'Logout'} handleClick={() => handleLogout()}>
                  <span className='material-symbols-outlined'>logout</span>
                </NoteActionButton>
              </Dropdown>
            </div>
          </>
        ) : ''}
      </div>
    </div>
  );
};