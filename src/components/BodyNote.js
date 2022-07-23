import { memo } from 'react';
import ImportantCheckbox from './ImportantCheckbox';
import TextArea from './TextArea';

const BodyNote = ({
  isEditing,
  newContent,
  handleContentChange,
  id,
  newImportant,
  handleImportantChange,
  handleUpdate,
  content
}) => {
  return (
    <div className='NoteBody'>
      {isEditing
        ? (
          <>
            <TextArea
              newContent={newContent}
              handleContentChange={handleContentChange}
            />
            <div>
              <ImportantCheckbox
                id={id}
                newImportant={newImportant}
                handleImportantChange={handleImportantChange}
              />
              <span
                className='material-symbols-outlined SaveButton'
                onClick={handleUpdate}
              >
                    save
              </span>
            </div>
          </>
        )
        : (<p>{content}</p>)
      }
    </div>
  );
};

export default memo(BodyNote);