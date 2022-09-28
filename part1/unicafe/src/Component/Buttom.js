import React from "react";

const Buttom = ({ text, setVal, val }) => {
  const onClickHandler = () => {
    setVal(val + 1);
  };
  return (
    <button onClick={onClickHandler} style={{ margin: "0rem 0.4rem" }}>
      {text}
    </button>
  );
};

export default Buttom;
