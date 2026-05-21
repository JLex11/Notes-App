const baseUrl = 'http://localhost:3001/login';

const loginRequest = {};

loginRequest.login = async credencials => {
  // Mock login - accepts any credentials
  const mockUser = {
    username: credencials.username || 'User',
    token: 'mock_token_' + Date.now(),
    email: credencials.username + '@notes-app.local'
  };

  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve(mockUser);
    }, 500);
  });
};

export default loginRequest;
