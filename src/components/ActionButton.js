import { memo } from 'react';

const ActionButton = ({ handleClick, label, children }) => {
  return (
    <div onClick={handleClick} className="ActionButton">
      {children}
      <span>{label}</span>
    </div>
  );
};

export default memo(ActionButton);
