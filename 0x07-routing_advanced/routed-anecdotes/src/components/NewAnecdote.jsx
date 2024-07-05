import { postAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { notify, clearNotification } from '../reducers/notifcationReducer';
import { useField } from '../hooks';

const CreateNew = () => {
  const content = useField({ type: 'text', name: 'content' });
  const author = useField({ type: 'text', name: 'author' });
  const info = useField({ type: 'text', name: 'info' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const genId = () => {
    return parseInt((Math.random() * 1000).toFixed(0));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    const author = e.target.content.value;
    const info = e.target.content.value;
    const anecdote = {
      content,
      author,
      info,
      id: genId(),
      votes: 0
    };
    dispatch(postAnecdote(anecdote));
    dispatch(notify(`A new anecdote ${content} created!`));
    navigate('/');
    setTimeout(() => dispatch(clearNotification()), 5000);
  };

  const clearForm = (event) => {
    event.preventDefault();
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content
          <input {...content} />
        </div>
        <div>
          Author
          <input {...author} />
        </div>
        <div>
          Url for more info
          <input {...info} />
        </div>
        <input type='submit' value='Create' />
        <input type='reset' value='Clear' onClick={clearForm} />
      </form>
    </div>
  );
};

export default CreateNew;
