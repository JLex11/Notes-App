export const Header = (headers) => { 
  const {user, handleSetUser} = headers;

  return (
    <div className="HeaderBar">
      <div></div>
      <div>
        {user ? (
          <span
            className='material-symbols-outlined LogOut'
            onClick={()=>handleSetUser()}
          >logout</span>
        ) : ''}
      </div>
    </div>
  )
};