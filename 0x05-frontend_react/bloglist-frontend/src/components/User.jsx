import { logout } from '../services/auth';

const User = ({ user }) => {
  return (
    <>
      <span>{user.username} Logged In</span>
      <span><button onClick={logout}>Logout</button></span>
    </>
  );
};

export default User;
