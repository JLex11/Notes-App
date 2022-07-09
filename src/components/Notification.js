export const Notification = ({ message, children }) => {
  return (
    <div className='Notification'>
      <p>{message}</p>
      {children}
    </div>
  )
};