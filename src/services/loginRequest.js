const baseUrl = 'http://localhost:3001/login';

const loginRequest = {};

loginRequest.login = async credencials => { 
  const request = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credencials)
  });

  return request.json()
    .then(response => response)
    .catch(error => error);
}

export default loginRequest;