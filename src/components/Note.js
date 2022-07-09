import 'material-symbols';
import moment from "moment";
import 'moment/locale/es';

moment.locale("es");

export const Note = (note) => {
  const { id, content, date, important, handleDeleteNote, timeTransition, user } = note;
  const dateFormatted = moment(date).startOf("minute").fromNow();

  const customStyles = {
    animationDelay: timeTransition,
    gridColumn: content.length > 150 ? "span 2" : "span 1",
  };

  return (
    <div className={`Note i-${important}`} style={customStyles} >
      <div className="HeaderNote">
        <div className="Date">
          <span className='material-symbols-outlined'>history</span>
          <b>{dateFormatted}</b>
        </div>
        <div className="Delete">
          {user ? (
            <span
            onClick={() => handleDeleteNote(id)}
            className='material-symbols-outlined'>delete
            </span>
          ) : null}
        </div>
      </div>
      <div className='NoteBody'>
        <p>{content}</p>
      </div>
    </div>
  );
};