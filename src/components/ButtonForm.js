export const Button = ({ content, disable, handleHiddenClick, children }) => {
  return (
    <button className={disable ? 'disabledBtn' : ''} onClick={()=>handleHiddenClick()}>
      {children}
      {content ? <span>{content}</span> : null}
    </button>
  );
}