export const Button = ({ content, disable, handleHiddenClick, children }) => {
  return (
    <button className={disable ? 'disabledBtn' : ''}>
      {children}
      {content ? <span>{content}</span> : null}
    </button>
  );
};
