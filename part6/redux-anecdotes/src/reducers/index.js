import { combineReducers } from "redux";
import anecdoteReducer from "./anecdoteReducer";
import FilterReducer from "./FilterReducer";
import NotificationReducer from "./NotificationReducer";

const reducers = combineReducers({
  anecdotes: anecdoteReducer,
  notification: NotificationReducer,
  filter: FilterReducer,
});

export default reducers;
