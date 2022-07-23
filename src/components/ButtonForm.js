import { memo } from 'react';

const Button = ({ content, disable, children }) => {
  return (
    <button className={disable ? 'disabledBtn' : ''}>
      {children}
      {content ? <span>{content}</span> : null}
    </button>
  );
};

export default memo(Button);