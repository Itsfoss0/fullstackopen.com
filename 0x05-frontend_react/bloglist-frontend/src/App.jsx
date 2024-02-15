import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import NewBlog from './components/NewBlog';
import Togglable from './components/Togglable';
import User from './components/User';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);

  const formRef = useRef(null);
  const fetchBlogs = async () => {
    const data = await blogService.getAll();
    data.sort((a, b) => b.likes - a.likes);
    setBlogs(data);
  };

  const getUser = () => {
    const user = JSON.parse(window.localStorage.getItem('user'));
    if (user) setUser(user);
  };

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <button onClick={() => toggleLogin()}>Login</button>
      {showLogin && <LoginForm />}
      <div>
        {user && <User user={user} />}
        <h2>blogs</h2>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
        <Togglable label='New' ref={formRef}>
          <NewBlog ref={formRef} />
        </Togglable>
      </div>
    </>
  );
};

export default App;
