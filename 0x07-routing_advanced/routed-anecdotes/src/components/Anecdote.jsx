import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Anecdote = () => {
  const { id } = useParams();
  const anecdote = useSelector((state) => state.anecdotes.find((a) => a.id === parseInt(id)));
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p> has {anecdote.votes} votes</p>
    </div>
  );
};

export default Anecdote;
