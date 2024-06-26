/* eslint-disable */

import { useSelector, useDispatch } from "react-redux";
import { upVoteAnecdote } from "../reducers/anecdoteReducer";

const Anecdote = ({ info, upVote }) => {
  return (
    <div>
      <p>{info.content}</p>
      has {info.votes}
      <button onClick={upVote}>Vote</button>
    </div>
  );
};

const AnecdoteList = () => {
  const anecdotesArray = useSelector((state) => state);
  anecdotesArray.sort((a, b) => b.votes - a.votes);
  const dispatch = useDispatch();

  return (
    <div>
      <ul>
        {anecdotesArray.map((anec) => (
          <Anecdote
            key={anec.id}
            info={anec}
            upVote={() => dispatch(upVoteAnecdote(anec))}
          />
        ))}
      </ul>
    </div>
  );
};

export default AnecdoteList;
