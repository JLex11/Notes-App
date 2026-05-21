
// Mock notes service using localStorage
const NOTES_STORAGE_KEY = 'notesAppData';
const notesRequest = {};

let token;

notesRequest.setToken = (t) => token = `Bearer ${t}`;

// Initialize default notes in localStorage if empty
const initializeDefaultNotes = () => {
  const existing = localStorage.getItem(NOTES_STORAGE_KEY);
  if (!existing) {
    const defaultNotes = [
      {
        id: '1',
        title: 'Welcome to Notes App',
        content: 'This is a mock local version. All notes are saved in your browser localStorage.',
        important: true,
        date: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Getting Started',
        content: 'You can create, edit, and delete notes. They will be persisted locally.',
        important: false,
        date: new Date().toISOString()
      }
    ];
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(defaultNotes));
  }
};

notesRequest.getAll = async () => {
  initializeDefaultNotes();
  const notes = localStorage.getItem(NOTES_STORAGE_KEY);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(notes ? JSON.parse(notes) : []);
    }, 300);
  });
};

notesRequest.create = async ({ note }) => {
  initializeDefaultNotes();
  const notes = JSON.parse(localStorage.getItem(NOTES_STORAGE_KEY) || '[]');
  const newNote = {
    ...note,
    id: Date.now().toString(),
    date: new Date().toISOString()
  };
  notes.push(newNote);
  localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(newNote);
    }, 200);
  });
};

notesRequest.delete = async ({ id }) => {
  const notes = JSON.parse(localStorage.getItem(NOTES_STORAGE_KEY) || '[]');
  const filtered = notes.filter(note => note.id !== id);
  localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(filtered));
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, id });
    }, 200);
  });
};

notesRequest.update = async ({ id, note }) => {
  const notes = JSON.parse(localStorage.getItem(NOTES_STORAGE_KEY) || '[]');
  const index = notes.findIndex(n => n.id === id);
  
  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      ...note,
      id,
      date: notes[index].date // preserve original date
    };
  }
  
  localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(notes[index] || { error: 'Note not found' });
    }, 200);
  });
};

export default notesRequest;
