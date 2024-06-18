import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import NewBlog from "./components/NewBlog";
import Togglable from "./components/Togglable";
import User from "./components/User";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true);

  const formRef = useRef(null);

  const fetchBlogs = async () => {
    const data = await blogService.getAll();
    if (data.length > 0) {
      data.sort((a, b) => b.likes - a.likes);
      setBlogs(data);
    }
  };

  const getUser = () => {
    const user = JSON.parse(window.localStorage.getItem("user"));
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
    getUser();
  }, []);

  useEffect(() => {
      fetchBlogs();
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
          <Togglable label="New" innerRef={formRef}>
            <NewBlog innerRef={formRef} />
          </Togglable>
        </div>
      )}
    </>
  );
};

export default App;
