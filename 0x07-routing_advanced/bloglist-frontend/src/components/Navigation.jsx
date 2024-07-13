import { logout } from '../services/auth';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Navigation = ({ user }) => {
  const style = {
    padding: '2',
    textDecoration: 'none'
  };
  return (
    <>
      <NavLink style={style} to='/users'> Users </NavLink>
      <NavLink style={style} to='/blogs'> Blogs </NavLink>
      <span>{user.username} Logged In</span>
      <span>
        <button onClick={logout}>Logout</button>
      </span>
    </>
  );
};

Navigation.propTypes = {
  user: PropTypes.object.isRequired
};

export default Navigation;
