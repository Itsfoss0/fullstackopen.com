/* eslint-disable no-case-declarations */

import { createSlice } from '@reduxjs/toolkit';
import { getAll, postNewAnecdote, voteAnecdote } from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote (state, action) {
      const content = action.payload;
      state.push(content);
    },
    updateAnecdote (state, action) {
      const id = action.payload.id;
      const anecdoteToVote = state.find((a) => a.id === id);
      const updatedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      };
      return state.map((a) =>
        a.id === action.payload.id ? updatedAnecdote : a
      );
    },
    setAnecdotes (state, action) {
      return action.payload;
    }
  }
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const data = await getAll();
    dispatch(setAnecdotes(data));
  };
};

export const newAnecdote = (content) => {
  return async (dispatch) => {
    const data = await postNewAnecdote(content);
    dispatch(appendAnecdote(data));
  };
};
export const upVoteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote = await voteAnecdote(anecdote);
    dispatch(updateAnecdote(updatedAnecdote));
  };
};

export const { appendAnecdote, updateAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
