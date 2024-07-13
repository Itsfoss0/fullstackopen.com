import { configureStore } from '@reduxjs/toolkit';
import notitification from './reducers/notitification.reducer';

const store = configureStore({
  reducer: {
    notification: notitification
  }
});

export default store;
