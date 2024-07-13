import axios from 'axios';
const baseURL = '/api/users';

export const getAllUsers = async () => {
  const resp = await axios.get(baseURL);
  return resp.data;
};

export const getUserByID = async (id) => {
  const resp = await axios.get(`${baseURL}/${id}`);
  return resp.data;
};
