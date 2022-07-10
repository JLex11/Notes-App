export const ButtonHidden = ({ handleHiddenClick, children }) => {
  return (
    <button type="button" className="ButtonHidden" onClick={() => handleHiddenClick()} >
      {children}
    </button>
  );
}