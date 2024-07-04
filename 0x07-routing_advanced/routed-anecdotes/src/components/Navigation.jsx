import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const padding = {
    paddingRight: 5
  };

  return (
    <div>
      <NavLink to='/' style={padding}>Anecdotes</NavLink>
      <NavLink to='/about' style={padding}>About</NavLink>
      <NavLink to='/create' style={padding}>Create New</NavLink>
    </div>
  );
};

export default Navigation;
