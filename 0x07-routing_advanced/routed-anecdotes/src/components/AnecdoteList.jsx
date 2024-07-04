import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}><NavLink to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</NavLink></li>
        ))}
      </ul>
    </div>
  );
};
export default AnecdoteList;
