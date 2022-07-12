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

  const user = await request.json();
  if (user && user.error) {
    throw new Error(user.error);
  }
  return user;
};

export default loginRequest;