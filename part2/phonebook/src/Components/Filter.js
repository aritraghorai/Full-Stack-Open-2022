import React from "react";

const Filter = ({ onChangeShowAll }) => {
  return (
    <form>
      filter shown with: <input type="text" onChange={onChangeShowAll} />
    </form>
  );
};

export default Filter;
