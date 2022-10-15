import React from "react";
import { useDispatch } from "react-redux";
import { addVotesToServer } from "../reducers/anecdoteReducer";
import { showNotifications } from "../reducers/NotificationReducer";

function Anecdotes({ id, content, votes }) {
  const dispatch = useDispatch();
  const vote = (id) => {
    dispatch(showNotifications(`you voted ${content}`, 2));
    dispatch(addVotesToServer(id, { id, content, votes: votes + 1 }));
  };
  return (
    <div>
      <div key={id}>
        <div>{content}</div>
        <div>
          has {votes}
          <button onClick={() => vote(id)}>vote</button>
        </div>
      </div>
    </div>
  );
}

export default Anecdotes;
