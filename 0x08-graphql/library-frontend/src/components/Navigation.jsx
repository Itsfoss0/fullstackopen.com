import { NavLink } from 'react-router-dom';
import { Button, Nav } from 'react-bootstrap';
import useAuth from '../hooks/auth.hook';

const Navigation = () => {
  const { getUser, logout } = useAuth();
  const authUser = getUser();
  console.log(authUser);
  return (
    <Nav className='my-1'>
      <Nav.Item>
        <NavLink to='/' className='nav-link'>
          <Button variant='primary'>Authors</Button>
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        <NavLink to='/books' className='nav-link'>
          <Button variant='primary'>Books</Button>
        </NavLink>
      </Nav.Item>
      <Nav.Item>
        {authUser
          ? (
            <NavLink to='/auth/login' className='nav-link'>
              <Button variant='primary' onClick={() => logout()}>
                Logout
              </Button>
            </NavLink>
            )
          : (
            <NavLink to='/auth/login' className='nav-link'>
              <Button variant='primary'>Login</Button>
            </NavLink>
            )}
      </Nav.Item>
    </Nav>
  );
};

export default Navigation;
