import { NavLink } from 'react-router-dom';
import { Button, Nav } from 'react-bootstrap';

const Navigation = () => {
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
    </Nav>
  );
};

export default Navigation;
