import { configureStore } from '@reduxjs/toolkit';
import blogsReducer from './reducers/blogs.reducer';
import notitification from './reducers/notitification.reducer';

const store = configureStore({
  reducer: {
    notification: notitification,
    blogs: blogsReducer
  }
});

export default store;
