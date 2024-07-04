import { postAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { notify, clearNotification } from '../reducers/notifcationReducer';

const CreateNew = () => {
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

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content
          <input name='content' />
        </div>
        <div>
          Author
          <input name='author' />
        </div>
        <div>
          Url for more info
          <input name='info' />
        </div>
        <button>Create</button>
      </form>
    </div>
  );
};

export default CreateNew;
