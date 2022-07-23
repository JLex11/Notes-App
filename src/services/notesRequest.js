const baseUrl = 'http://localhost:3001/notes';

const notesRequest = {};

let token = null;

notesRequest.setToken = newToken => {
  token = `Bearer ${newToken}`;
};

notesRequest.getAll = async ({limit}) => {
  const response = await fetch(baseUrl + `?limit=${limit}`);
  return await response.json();
};

notesRequest.create = async ({note}) => {
  const request = fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(note)
  });

  const response = await request;
  return await response.json();
};

notesRequest.delete = async ({id}) => {
  const request = fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': token
    }
  });

  const response = await request;
  return await response.json();
};

notesRequest.update = async ({ id, note }) => {
  const request = fetch(`${baseUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(note)
  });

  const response = await request;
  return await response.json();
};

export default notesRequest;