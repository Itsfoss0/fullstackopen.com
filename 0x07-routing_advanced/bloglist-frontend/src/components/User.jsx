import { logout } from '../services/auth';
import PropTypes from 'prop-types';

const User = ({ user }) => {
  return (
    <>
      <span>{user.username} Logged In</span>
      <span>
        <button onClick={logout}>Logout</button>
      </span>
    </>
  );
};

User.propTypes = {
  user: PropTypes.object.isRequired
};

export default User;
