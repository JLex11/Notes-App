export const Note = ({ id, title, body }) => {
  return (
    <div className='Note'>
      <h3>{id}</h3>
      <p>{title}</p>
      <small>{body}</small>
    </div>
  );
};