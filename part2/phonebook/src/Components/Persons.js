import React from "react";
import Person from "./Person";

const Persons = ({ persons, deleteHandler }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons.map((p) => (
        <Person person={p} key={p.id} deleteHandler={deleteHandler} />
      ))}
    </>
  );
};

export default Persons;
