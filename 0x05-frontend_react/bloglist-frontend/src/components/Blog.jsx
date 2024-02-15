import { useState } from 'react';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const buttonLabel = expanded ? 'Hide' : 'View';

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={toggleExpand}>{buttonLabel}</button>
      {expanded && (
        <>
          <p><a href={blog.url}>{blog.url}</a></p>
          <div>Likes: {blog.likes}</div>
          <div>Author: {blog.author}</div>
        </>
      )}
    </div>
  );
};

export default Blog;
