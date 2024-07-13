import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllUsers } from '../services/users';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((resp) => setUsers(resp));
  }, []);
  console.log(users);
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Blogs</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td><Link to={user.id}>{user.username} </Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
