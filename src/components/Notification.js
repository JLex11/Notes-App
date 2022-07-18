export const Notification = ({ message, type, handleResetMessage, children }) => {
  const colors = {
    success: {
      icon: 'done',
      background: 'linear-gradient(to bottom, #2cb710, #29c30a)',
      color: '#fff'
    },
    error: {
      icon: 'error',
      background: 'linear-gradient(to bottom, #f44336, #e63629)',
      color: '#fff'
    },
    warning: {
      icon: 'warning',
      background: 'linear-gradient(to bottom, #ffb515, #e5a211)',
      color: '#fff'
    },
    info: {
      icon: 'info',
      background: 'linear-gradient(to bottom, #008ae6, #0099ff)',
      color: '#fff'
    },
    loading: {
      icon: '',
      background: 'linear-gradient(to bottom, #008ae6, #0099ff)',
      color: '#fff'
    },
    default: {
      icon: 'notifications',
      background: 'linear-gradient(to bottom, #d8d8d8, #c9c9c9)',
      color: '#000'
    }
  };

  const { background, color, icon } = colors[type] || colors.default;
  const style = { background, color };
  
  setTimeout(() => {
    handleResetMessage();
  }, 3000);

  return (
    <div className='Notification' style={style}>
      <p>{message}</p>
      {icon === ''
        ? null
        : <span className="material-symbols-outlined">{icon}</span>}
      {children}
    </div>
  );
};