import { useState } from 'react';
import { notify } from '../reducers/notitification.reducer';
import { loginUser } from '../services/auth';
import { useDispatch, useSelector } from 'react-redux';
const LoginForm = () => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.notification);
  const submitForm = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const payload = Object.fromEntries(data);
    try {
      const resp = await loginUser(payload);
      if (resp.status === 200) {
        const user = JSON.stringify(resp.data);
        dispatch(notify('Logged In successfully', 2000));
        localStorage.setItem('user', user);
      }
    } catch (error) {
      dispatch(notify('Invalid username or password', 2000));
    }
  };

  return (
    <div>
      <h2>Login to the application</h2>
      {message && <div>{message}</div>}
      <form onSubmit={submitForm} method='post'>
        <div>
          Username: <input type='text' id='username' name='username' />
        </div>
        <div>
          Password: <input type='password' id='password' name='password' />
        </div>
        <button type='submit' id='submit'>
          {' '}
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
