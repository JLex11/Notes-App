import { memo } from 'react';
import styles from '../styles/Note.module.css';
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
    <div className={styles.NoteBody}>
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
                className={`material-symbols-outlined ${styles.SaveButton}`}
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