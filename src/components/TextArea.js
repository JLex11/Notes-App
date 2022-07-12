export const TextArea = ({newContent, handleContentChange}) => {
  return (
    <>
      <textarea
        className="EditingTextarea"
        value={newContent}
        onChange={(e) => handleContentChange(e)}
      />
    </>
  );
};