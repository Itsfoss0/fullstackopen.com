import { createSelector } from 'reselect';

const selectBlogs = (state) => state.blogs;

const selectSortedBlogs = createSelector([selectBlogs], (blogs) => {
  return [...blogs].sort((a, b) => b.likes - a.likes);
});

export { selectSortedBlogs };
