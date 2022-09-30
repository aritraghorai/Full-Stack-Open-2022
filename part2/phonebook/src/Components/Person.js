import React from "react";

const Person = ({ person, deleteHandler }) => {
  const { name, number, id } = person;
  const onClickHandler = (e) => {
    deleteHandler(id, name);
  };
  return (
    <>
      <p>
        {name} {number} <button onClick={onClickHandler}>delete</button>
      </p>
    </>
  );
};

export default Person;
