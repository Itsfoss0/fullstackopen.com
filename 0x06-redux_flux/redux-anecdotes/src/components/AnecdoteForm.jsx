import { newAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createAnecDote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = '';
    dispatch(newAnecdote(content));
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
