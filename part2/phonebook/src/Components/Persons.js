import React from "react";

const Persons = ({ persons }) => {
  return (
    <>
      <h2>Numbers</h2>
      {persons.map((p) => (
        <p key={p.id}>
          {p.name} {p.number}
        </p>
      ))}
    </>
  );
};

export default Persons;
