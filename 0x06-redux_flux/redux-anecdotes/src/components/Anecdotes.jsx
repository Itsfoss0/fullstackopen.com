/* eslint-disable */

import { useSelector, useDispatch } from "react-redux";
import { upVoteAnecdote, newAnecdote } from "../reducers/anecdoteReducer";

const Anecdote = ({ info, upVote }) => {
  return (
    <div>
      <p>{info.content}</p>
      has {info.votes}
      <button onClick={upVote}>Vote</button>
    </div>
  );
};

export const NewAnecDote = () => {
  const dispatch = useDispatch();

  const createAnecDote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";
    dispatch(newAnecdote(content));
  };

  return (
    <form onSubmit={createAnecDote}>
      Content: <input name="note" id="note" />
      <button type="submit">Create</button>
    </form>
  );
};

export const Anecdotes = () => {
  const anecdotesList = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      <ul>
        {anecdotesList.map((anec) => (
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
