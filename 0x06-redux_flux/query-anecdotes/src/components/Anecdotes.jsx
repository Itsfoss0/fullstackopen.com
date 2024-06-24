/* eslint-disable */

import { voteAnecdote } from "../services/anecdotes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import NotificationContext, {
  setNotification,
  clearNotification,
} from "../context/notificationReducer";
import { useContext } from "react";

const Anecdote = ({ anec }) => {
  const [notification, dispatch] = useContext(NotificationContext);
  const client = useQueryClient();
  const upvoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: (voted) => {
      client.invalidateQueries({ queryKey: ["anecdotes"] });
      dispatch(setNotification(`Anecdote ${voted.content} voted`));
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    },
  });
  return (
    <>
      <div>{anec.content}</div>
      <div>
        has {anec.votes}
        <button onClick={() => upvoteMutation.mutate(anec)}> Vote</button>
      </div>
    </>
  );
};

export default Anecdote;
