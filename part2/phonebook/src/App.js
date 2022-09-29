import { useState, useEffect } from "react";
import Persons from "./Components/Persons";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
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
    if (getPerson.length !== 0) {
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
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);
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
