import React from "react";
import { useDispatch } from "react-redux";
import { addNewAnecdotesToServer, getId } from "../reducers/anecdoteReducer";

function AnecdotesForm() {
  const dispatch = useDispatch();
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    const newAnecdots = {
      content,
      id: getId(),
      votes: 0,
    };
    e.target.content.value = "";
    dispatch(addNewAnecdotesToServer(newAnecdots));
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onSubmitHandler}>
        <div>
          <input type="text" name="content" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
}

export default AnecdotesForm;
