import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from '../graphql/operations';
import useAuth from '../hooks/auth.hook';

const LoginPage = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loginUserMutation, { error, loading }] = useMutation(LOGIN, {
    variables: {
      username: userName,
      password
    },
    onCompleted: (data) => {
      login(JSON.stringify(data.resp.value));
    }
  });

  const handleLogin = (event) => {
    event.preventDefault();
    loginUserMutation();
    navigate('/');
  };

  if (loading) return <h2>Logging in </h2>;
  if (error) return <h2>An error occured when logging in </h2>;

  return (
    <>
      <h2>Login here</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='username'>Username: </label>
          <input
            type='text'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Username: </label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button disabled={loading} type='submit'>
          Login
        </button>
      </form>
    </>
  );
};

export default LoginPage;
