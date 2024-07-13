import Navigation from './Navigation';

const Header = () => {
  const user = JSON.parse(window.localStorage.getItem('user'));
  if (user) {
    return (
      <>
        <h2>Blog app</h2>
        <Navigation user={user} />
      </>
    );
  }
};

export default Header;
