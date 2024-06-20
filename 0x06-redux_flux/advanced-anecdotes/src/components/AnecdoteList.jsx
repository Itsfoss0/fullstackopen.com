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
  const anecdotesArray = useSelector(({ filterText, anecdotes }) => {
    if (filterText === "") {
      return anecdotes;
    }
    // return an array of those that match the filter  criteria
    const matches = anecdotes.filter((anc) =>
      anc.content.toLowerCase().includes(filterText.toLowerCase())
    );
    return matches;
  });
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
