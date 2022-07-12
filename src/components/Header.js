export const Header = (headers) => {
  const {user, handleLogout} = headers;

  return (
    <div className="HeaderBar">
      <div></div>
      <div>
        {user ? (
          <span
            className='material-symbols-outlined LogOut'
            onClick={() => handleLogout()}
          >logout</span>
        ) : ''}
      </div>
    </div>
  );
};