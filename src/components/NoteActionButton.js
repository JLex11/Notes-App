export const NoteActionButton = ({ handleClick, label, children }) => {
  return (
    <div onClick={handleClick} className="ActionButton">
      {children}
      <span>{label}</span>
    </div>
  );
};
