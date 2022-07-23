import { memo } from 'react';

const ImportantCheckbox = ({
  id,
  newImportant,
  handleImportantChange,
}) => {
  if (!id) {
    id = Math.random() * 1000;
  }

  return (
    <label htmlFor={`checkbox-${id}`} className="ImportantConfig">
      <h5>Important</h5>
      <input
        type="checkbox"
        id={`checkbox-${id}`}
        className="ImportantCheckbox"
        checked={newImportant}
        onChange={e => handleImportantChange(e)}
      />
      <span className="material-symbols-outlined">
        {newImportant
          ? 'select_check_box'
          : 'check_box_outline_blank'}
      </span>
    </label>
  );
};

export default memo(ImportantCheckbox);
