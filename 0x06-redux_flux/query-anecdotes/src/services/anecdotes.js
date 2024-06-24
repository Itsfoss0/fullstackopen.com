import axios from 'axios';

const baseURL = 'anecdotes';
export const getAllNotes = async () => {
  const resp = await axios.get(baseURL);
  return resp.data;
};

export const createNewAnecdote = async (content) => {
  const anecdote = {
    content,
    votes: 0
  };
  const resp = await axios.post(baseURL, anecdote);
  return resp.data;
};

export const voteAnecdote = async (anecdote) => {
  const updatedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  };
  const resp = await axios.put(`${baseURL}/${anecdote.id}`, updatedAnecdote);
  return resp.data;
};
