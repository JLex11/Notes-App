export const FilterNotes = ({ user, notes, filter }) => {
  if (filter === 'all') return notes;
  if (filter === 'important') return notes.filter(note => note.important);
  if (filter === 'unimportant') return notes.filter(note => !note.important);
  if (filter === 'user') return notes.filter(note => note.user.username === user.username);
  return notes;
};