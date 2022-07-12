export const NoteActionButton = ({ handleClick, children }) => {
  return (
    <div onClick={handleClick} className="ActionButton">
      {children}
    </div>
  );
};
