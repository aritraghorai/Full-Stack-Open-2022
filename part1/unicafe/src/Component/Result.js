import React from "react";

const Result = ({ good, neutral, bad }) => {
  return (
    <div>
      <h1>statistics</h1>
      <div>good {good}</div>
      <div>natural {neutral}</div>
      <div>bad {bad}</div>
    </div>
  );
};

export default Result;
