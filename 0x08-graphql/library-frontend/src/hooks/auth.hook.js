const useAuth = () => {
  const login = (data) => {
    window.localStorage.setItem('authUser', data);
  };

  const logout = () => {
    window.localStorage.removeItem('authUser');
  };

  const getUser = () => {
    const user = window.localStorage.getItem('authUser');
    return user ? JSON.parse(user) : null;
  };

  return { login, logout, getUser };
};

export default useAuth;
