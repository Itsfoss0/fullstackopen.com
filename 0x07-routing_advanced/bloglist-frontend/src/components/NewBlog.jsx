import { forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { notify } from '../reducers/notitification.reducer';
import { useSelector, useDispatch } from 'react-redux';
import { addBlog } from '../reducers/blogs.reducer';

const NewBlog = forwardRef((props, innerRef) => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.notification);
  useImperativeHandle(innerRef, () => ({
    closeForm () {
      if (innerRef && innerRef.current) {
        formRef.current.style.display = 'none';
        innerRef.current.close();
      }
    }
  }));

  const submitBlog = async (event) => {
    event.preventDefault();
    const user = JSON.parse(window.localStorage.getItem('user'));
    const data = new FormData(event.target);
    const payload = Object.fromEntries(data);
    try {
      const resp = await dispatch(addBlog(payload, user.accessToken));
      if (resp.status === 201) {
        event.target.reset();
        dispatch(notify('Added new Blog', 2000));
      }
    } catch (error) {
      console.log(error);
      dispatch(notify('Could not add blog', 2000));
    }
  };

  return (
    <>
      {message !== '' && <div>{message}</div>}
      <h2>Add another blog</h2>
      <form onSubmit={submitBlog} method='POST'>
        <div>
          Title: <input type='text' id='title' name='title' />
        </div>
        <div>
          Author: <input type='text' id='author' name='author' />
        </div>
        <div>
          Link: <input type='text' id='link' name='url' />
        </div>
        <button id='new-blog' type='submit'>
          Create
        </button>
      </form>
    </>
  );
});

NewBlog.propTypes = {
  innerRef: PropTypes.object
};

export default NewBlog;
