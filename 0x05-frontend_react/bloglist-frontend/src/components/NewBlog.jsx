
import { useState } from 'react';
import blogService from '../services/blogs';

const NewBlog = () => {
  const [message, setMessage] = useState(null);
  const clearMessage = () => {
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  };
  const submitBlog = async (event) => {
    event.preventDefault();
    const user = JSON.parse(window.localStorage.getItem('user'));
    const data = new FormData(event.target);
    const payload = Object.fromEntries(data);
    const resp = await blogService.createNew(user.accessToken, payload);
    if (resp.status === 201) {
      setMessage('Added New blog');
      clearMessage();
      return;
    }
    setMessage('Could not add blog');
    clearMessage();
  };

  return (
    <>  {message && <div>{message}</div>}
      <h2>Add another blog</h2>
      <form onSubmit={submitBlog} method='POST'>
        <div>Title: <input type='text' name='title' /></div>
        <div>Author: <input type='text' name='author' /></div>
        <div>Link: <input type='text' name='url' /></div>
        <button type='submit'>Create</button>
      </form>
    </>
  );
};

export default NewBlog;
