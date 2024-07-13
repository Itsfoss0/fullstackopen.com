import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserByID } from '../services/users';

const DetailedUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState({ blogs: [] });

  useEffect(() => {
    getUserByID(id).then((resp) => setUser(resp));
  }, [id]);

  return (
    <>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
};

export default DetailedUser;
