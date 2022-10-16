import React from "react";
import { connect } from "react-redux";
import { setFilter } from "../reducers/FilterReducer";

const Filter = ({ setFilter }) => {
  const onChange = (e) => {
    setFilter(e.target.value);
  };
  return (
    <div>
      Filter <input type="text" name="filter" id="filter" onChange={onChange} />
    </div>
  );
};

export default connect(null, { setFilter })(Filter);
