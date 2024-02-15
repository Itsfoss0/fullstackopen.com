import { useState } from 'react';
import blogs from '../services/blogs';

const Blog = ({ blog }) => {
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
      const resp = await blogs.deleteBlog(blog.id, token);
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
            <a href={blog.url}>{blog.url}</a>
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

export default Blog;
