<<<<<<< HEAD
export const Button = ({ content, disable, handleHiddenClick, children }) => {
  return (
    <button className={disable ? 'disabledBtn' : ''} onClick={()=>handleHiddenClick()}>
=======
export const Button = ({ content, disable, children }) => {
  return (
    <button className={disable ? 'disabledBtn' : ''} >
>>>>>>> refs/remotes/origin/master
      {children}
      {content ? <span>{content}</span> : null}
    </button>
  );
}