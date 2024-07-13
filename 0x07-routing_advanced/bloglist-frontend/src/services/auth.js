import axios from 'axios';

const baseURL = '/api/auth/login';
const loginUser = async (credentials) => {
  const response = await axios.post(baseURL, credentials);
  return response;
};

const logout = (event) => {
  event.preventDefault();
  window.localStorage.clear();
};

export { loginUser, logout };
