export const Dropdown = ({ user, icon, dropdown, handleDropdown, children }) => {
  return (
    <>
      {user ? (
        <span
          className='material-symbols-outlined DropdownIconLauncher'
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