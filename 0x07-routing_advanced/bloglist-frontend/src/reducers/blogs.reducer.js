import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs (state, action) {
      return action.payload;
    },
    appendBlog (state, action) {
      return [...state, action.payload];
    },
    deleteBlog (state, action) {
      const blogToDel = action.payload;
      return state.filter((blog) => blog.id !== blogToDel);
    }
  }
});

export const fetchBlogsFromAPI = () => {
  return async (dispatch, getState) => {
    const resp = await blogService.getAll();
    dispatch(setBlogs(resp));
  };
};

export const addBlog = (content, auth) => {
  return async (dispatch, getState) => {
    const resp = await blogService.createNew(auth, content);
    dispatch(appendBlog(resp.data));
    return resp;
  };
};

export const removeBlog = (id, auth) => {
  return async (dispatch, getState) => {
    const resp = await blogService.deleteBlog(id, auth);
    dispatch(deleteBlog(id));
    return resp;
  };
};

export const { setBlogs, appendBlog, deleteBlog } = blogSlice.actions;
export default blogSlice.reducer;
