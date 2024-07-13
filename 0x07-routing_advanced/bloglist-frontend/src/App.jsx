import { createSelector } from '@reduxjs/toolkit';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import NewBlog from './components/NewBlog';
import Togglable from './components/Togglable';
import User from './components/User';
import { fetchBlogsFromAPI } from './reducers/blogs.reducer';
import { selectSortedBlogs } from './selectors/blogs.selector';

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(selectSortedBlogs);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  const formRef = useRef(null);

  const getUser = () => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (user) {
      setUser(user);
      setShowLogin(false);
    } else {
      setShowLogin(true);
    }
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  useEffect(() => {
    dispatch(fetchBlogsFromAPI());
  }, []);
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <button onClick={toggleLogin}>Login</button>
      {showLogin && <LoginForm />}
      {user && (
        <div>
          <User user={user} />
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

export default App;
