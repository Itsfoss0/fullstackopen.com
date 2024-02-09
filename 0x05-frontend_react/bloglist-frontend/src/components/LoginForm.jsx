import { useState } from 'react';
import { loginUser } from '../services/auth';

const LoginForm = () => {
  const [message, setMessage] = useState(null);
  const clearMessage = () => {
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };
  const submitForm = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const payload = Object.fromEntries(data);
    try {
      const resp = await loginUser(payload);
      if (resp.status === 200) {
        const user = JSON.stringify(resp.data);
        setMessage('Logged In successfully');
        window.localStorage.setItem('user', user);
        clearMessage();
      }
    } catch (error) {
      setMessage('Invalid username or password');
      clearMessage();
    }
  };

  return (
    <div>
      <h2>Login to the application</h2>
      {message && <div>{message}</div>}
      <form onSubmit={submitForm} method='post'>
        <div>Username: <input type='text' name='username' /></div>
        <div>Password: <input type='password' name='password' /></div>
        <button type='submit'> Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
