import { useState } from 'react';
import PropTypes from 'prop-types';
import blogs from '../services/blogs';
import { removeBlog } from '../reducers/blogs.reducer';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const token = JSON.parse(localStorage.getItem('user')).accessToken;

  const likeBlog = async () => {
    const payload = { ...blog, likes: blog.likes + 1 };
    const resp = await blogs.modifyBlog(blog.id, payload, token);
    if (resp.status === 200) {
      setLiked(true);
    }
  };

  const deleteBlog = async () => {
    const confirm = window.confirm(`Confirm you want to delete ${blog.title}`);
    if (confirm) {
      const resp = await dispatch(removeBlog(blog.id, token));
      if (resp.status === 204) {
        console.log(`Deleted ${blog.title}`);
      }
    }
  };

  const buttonLabel = expanded ? 'Hide' : 'View';

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={toggleExpand}>{buttonLabel}</button>
      {expanded && (
        <>
          <p>
            <NavLink to={blog.id}>{blog.title}</NavLink>
          </p>
          <div>
            Likes: {blog.likes}
            <button onClick={likeBlog} disabled={liked}>
              Like
            </button>
          </div>
          <div>Author: {blog.author}</div>
          <button onClick={deleteBlog}>🗑 Delete</button>
        </>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired
};

export default Blog;
