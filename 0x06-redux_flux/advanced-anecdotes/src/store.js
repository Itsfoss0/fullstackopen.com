/* seperate the store for state management
 * from other components and the logic of the app
 */

import { configureStore } from '@reduxjs/toolkit';

import filterReducer from './reducers/filterReducer';
import anecdoteReducer from './reducers/anecdoteReducer';
import notificationReducer from './reducers/notificationReducer';

const store = configureStore({
  reducer: {
    filterText: filterReducer,
    anecdotes: anecdoteReducer,
    notifications: notificationReducer
  }
});

export default store;
