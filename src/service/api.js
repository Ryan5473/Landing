const BASE_URL = 'http://localhost:8080';

export const login = async (username, password) => {
  const response = await fetch(`${BASE_URL}/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!response.ok) {
    throw new Error('Login failed');
  }
  return await response.json();
};

export const getMessages = async (roomId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}/message-content/${roomId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error('Failed to get messages');
  }
  return await response.json();
};

export const getOnlineUsers = async () => {
  const response = await fetch(`${BASE_URL}/user/online`);
  if (!response.ok) {
    throw new Error('Failed to get online users');
  }
  return await response.json();
};
