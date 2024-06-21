import axios from 'axios';

const baseURL = '/anecdotes';

export const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};
