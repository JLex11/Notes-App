export const Button = ({ content, disable, children }) => {
  return (
    <button className={disable ? 'disabledBtn' : ''}>
      {children}
      <span>{content}</span>
    </button>
  );
}