import { createSlice, current } from "@reduxjs/toolkit";
import {
  addNewAnecdotes,
  getAllAnecdotes,
  incremntVoteOnAnecdotes,
} from "../services/anecdotes";
export const getId = () => (100000 * Math.random()).toFixed(0);

const initialState = [];

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    addAnecdotes(state, action) {
      state.push(action.payload);
    },
    voteAnecdotes(state, action) {
      const id = action.payload;
      const anecdote = state.find((a) => a.id === id);
      const newAnecdots = { ...anecdote, votes: current(anecdote).votes + 1 };
      return state.map((a) => (a.id === id ? newAnecdots : a));
    },
  },
});

export const filterAnecdote = (state) =>
  state.filter === ""
    ? state.anecdotes
    : state.anecdotes.filter((a) => {
        return a.content.toLowerCase().includes(state.filter);
      });
export default anecdotesSlice.reducer;
export const { addAnecdotes, voteAnecdotes } = anecdotesSlice.actions;

export const fetchAllAnecdots = () => {
  return async (dispatch) => {
    getAllAnecdotes().then((res) => {
      res.forEach((a) => {
        dispatch(addAnecdotes(a));
      });
    });
  };
};

export const addNewAnecdotesToServer = (body) => {
  return async (dispatch) => {
    addNewAnecdotes(body).then((res) => {
      dispatch(addAnecdotes(res));
    });
  };
};
export const addVotesToServer = (id, body) => {
  return async (dispatch) => {
    const res = await incremntVoteOnAnecdotes(id, body);
    dispatch(voteAnecdotes(res.id));
  };
};
