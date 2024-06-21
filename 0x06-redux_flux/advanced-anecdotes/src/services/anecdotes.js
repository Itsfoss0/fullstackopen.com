import axios from 'axios';

const baseURL = '/anecdotes';

export const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

export const postNewAnecdote = async (content) => {
  const anecdote = { content, votes: 0 };
  const response = await axios.post(baseURL, anecdote);
  return response.data;
};
