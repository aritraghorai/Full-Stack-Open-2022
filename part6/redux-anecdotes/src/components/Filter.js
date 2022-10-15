import React from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/FilterReducer";

const Filter = () => {
  const dispatch = useDispatch();
  const onChange = (e) => {
    dispatch(setFilter(e.target.value));
  };
  return (
    <div>
      Filter <input type="text" name="filter" id="filter" onChange={onChange} />
    </div>
  );
};

export default Filter;
