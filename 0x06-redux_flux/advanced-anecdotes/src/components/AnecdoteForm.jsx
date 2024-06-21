import { newAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { postNewAnecdote } from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createAnecDote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = '';
    const response = await postNewAnecdote(content);
    dispatch(newAnecdote(response));
    dispatch(setNotification(`Created ${content}`));
    setTimeout(() => {
      dispatch(setNotification(''));
    }, 3000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecDote}>
        Content: <input name='note' id='note' />
        <button type='submit'>Create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
