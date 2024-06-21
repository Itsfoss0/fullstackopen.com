/* eslint-disable no-case-declarations */

import { createSlice } from '@reduxjs/toolkit';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    newAnecdote (state, action) {
      const content = action.payload;
      state.push(content);
    },
    upVoteAnecdote (state, action) {
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

export const { newAnecdote, upVoteAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
