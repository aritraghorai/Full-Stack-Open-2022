import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllAnecdots, filterAnecdote } from "../reducers/anecdoteReducer";
import Anecdotes from "./Anecdote";

function AnecdotesList() {
  const anecdotes = useSelector(filterAnecdote);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllAnecdots());
  }, [dispatch]);
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdotes {...anecdote} key={anecdote.id} />
      ))}
    </div>
  );
}

export default AnecdotesList;
