export const Button = ({ content, disable, children }) => {
  return (
    <button className={disable ? 'disabledBtn' : ''} >
      {children}
      {content ? <span>{content}</span> : null}
    </button>
  );
}