import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blog from '../components/Blogs';
import LoginForm from '../components/LoginForm';
import NewBlog from '../components/NewBlog';
import Togglable from '../components/Togglable';
import { fetchBlogsFromAPI } from '../reducers/blogs.reducer';
import { selectSortedBlogs } from '../selectors/blogs.selector';

const Home = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(selectSortedBlogs);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const formRef = useRef(null);

  const getUser = () => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (user) {
      setUser(user);
    }
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  useEffect(() => {
    dispatch(fetchBlogsFromAPI());
  }, [dispatch]);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {!user && <button onClick={toggleLogin}>Login</button>}
      {showLogin && <LoginForm />}
      {user && (
        <div>
          <h2>blogs</h2>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
          <Togglable label='New' innerRef={formRef}>
            <NewBlog innerRef={formRef} />
          </Togglable>
        </div>
      )}
    </>
  );
};

export default Home;
