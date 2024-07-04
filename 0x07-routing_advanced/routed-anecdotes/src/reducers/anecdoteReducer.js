/* eslint-disable no-unused-vars */

import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    content: 'If it hurts, do it more often',
    author: 'Jez Humble',
    info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
    votes: 0,
    id: 1
  },
  {
    content: 'Premature optimization is the root of all evil',
    author: 'Donald Knuth',
    info: 'http://wiki.c2.com/?PrematureOptimization',
    votes: 0,
    id: 2
  }
];

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addNew (state, action) {
      state.push(action.payload);
    },
    vote (state, payload) {
      const anedote = state.find((elem) => elem.id === payload);
      const voted = {
        ...anedote,
        votes: anedote.votes + 1
      };
      return state.map((anc) => (anc.id !== payload ? anc : voted));
    }
  }
});

export const postAnecdote = (anecdote) => {
  return async (dispatch, getState) => {
    dispatch(addNew(anecdote));
  };
};

export const { addNew, vote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
