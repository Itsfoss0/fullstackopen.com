import { useSelector } from 'react-redux';
import { selectSortedBlogs } from '../selectors/blogs.selector';
import { useParams } from 'react-router-dom';

const DetailBlog = () => {
  const { id } = useParams();
  const allBlogs = useSelector(selectSortedBlogs);
  const blog = allBlogs.find((blog) => blog.id === id);
  console.log(blog);

  if (!blog) {
    return null;
  }

  return (
    <>
      <h2>{blog.title}</h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        <span>{blog.likes} likes</span>
        <button>like</button>
      </div>
      <div>added by {blog.user.name}</div>

      <h3>Comments</h3>
    </>
  );
};

export default DetailBlog;
