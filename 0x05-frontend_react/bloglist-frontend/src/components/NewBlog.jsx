import blogService from '../services/blogs';

const NewBlog = () => {
  const submitBlog = async (event) => {
    event.preventDefault();
    const user = JSON.parse(window.localStorage.getItem('user'));
    const data = new FormData(event.target);
    const payload = Object.fromEntries(data);
    // console.log(payload, user.accessToken)
    const resp = await blogService.createNew(user.accessToken, payload);
    console.log(resp);
  };

  return (
    <>
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
