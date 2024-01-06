import { memo } from 'react';

const TextArea = ({newContent, handleContentChange}) => {
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

export default memo(TextArea);