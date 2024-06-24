import { createNewAnecdote } from '../services/anecdotes';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import NotificationContext, {
  setNotification,
  clearNotification
} from '../context/notificationReducer';
import { useContext } from 'react';

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext);
  const client = useQueryClient();
  const createMutation = useMutation({
    mutationFn: createNewAnecdote,
    onSuccess: (newNote) => {
      client.invalidateQueries({ queryKey: ['anecdotes'] });
      dispatch(setNotification(`Anecdote ${newNote.content} created`));
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    },
    onError: () => {
      dispatch(
        setNotification('Too short anecdote, must have length 5 or more')
      );
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    }
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    createMutation.mutate(content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
