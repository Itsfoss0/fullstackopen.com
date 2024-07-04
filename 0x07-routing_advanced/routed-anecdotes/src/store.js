import { configureStore } from '@reduxjs/toolkit';
import anecdoteReducer from './reducers/anecdoteReducer';
import notifcationReducer from './reducers/notifcationReducer';

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    notification: notifcationReducer
  }
});

export default store;
