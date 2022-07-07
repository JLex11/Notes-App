const baseUrl = 'https://jsonplaceholder.typicode.com/posts';
/* const baseUrl = 'http://localhost:3001/notes'; */

const notes = {};

notes.getAll = async () => { 
  const response = await fetch(baseUrl);
  return await response.json();
};

notes.create = async (note) => {
  const request = fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note)
  });

  const response = await request;
  return await response.json();
};

export default notes;