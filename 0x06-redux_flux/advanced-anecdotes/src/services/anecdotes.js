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

export const voteAnecdote = async (anecdote) => {
  const updatedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  };
  const resp = await axios.put(`${baseURL}/${anecdote.id}`, updatedAnecdote);
  return resp.data;
};
