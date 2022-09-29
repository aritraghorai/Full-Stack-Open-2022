import { useState } from "react";
import Persons from "./Components/Persons";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState("");

  const onChangeHandlerName = (e) => {
    setNewName(e.target.value);
  };
  const onChangeHandlerNumber = (e) => {
    setNewNumber(e.target.value);
  };
  const onChangeShowAll = (e) => {
    setShowAll(e.target.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const getPerson = persons.filter((p) => p.name === newName);
    if (getPerson.length != 0) {
      alert(`${newName} ${newNumber} is already added to phonebook`);
      return;
    }
    setPersons(
      persons.concat({
        name: newName,
        id: persons.length + 1,
        number: newNumber,
      })
    );
    setNewName("");
    setNewNumber("");
  };
  const showPersons =
    showAll === ""
      ? persons
      : persons.filter((p) => p.name.toLowerCase().includes(showAll));
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChangeShowAll={onChangeShowAll} />
      <h1>Add a new</h1>
      <PersonForm
        onSubmitHandler={onSubmitHandler}
        onChangeHandlerName={onChangeHandlerName}
        onChangeHandlerNumber={onChangeHandlerNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <Persons persons={showPersons} />
    </div>
  );
};

export default App;
