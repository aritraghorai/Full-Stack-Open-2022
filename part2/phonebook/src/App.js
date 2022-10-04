import { useState, useEffect } from "react";
import Persons from "./Components/Persons";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import {
  addNewContact,
  deleteContact,
  getAllContacts,
  updateContact,
} from "./services/personsApi";
import Notification from "./Components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowAll] = useState("");
  const [message, setMessage] = useState({
    message: undefined,
    type: undefined,
  });

  const onChangeHandlerName = (e) => {
    setNewName(e.target.value);
  };
  const onChangeHandlerNumber = (e) => {
    setNewNumber(e.target.value);
  };
  const onChangeShowAll = (e) => {
    setShowAll(() => e.target.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const getPerson = persons.filter((p) => p.name === newName);
    if (getPerson.length !== 0) {
      if (
        window.confirm(
          `${newName} is already added to phonebook replace the old number with anew one?`
        )
      ) {
        updateContact(
          {
            name: newName,
            number: newNumber,
          },
          getPerson[0].id
        )
          .then((res) => {
            const updatePerson = persons.map((p) =>
              p.id === res.id ? res : p
            );
            setPersons(updatePerson);
          })
          .catch((err) => {
            setMessage({ message: err.response.data.error, type: "error" });
            setTimeout(() => {
              setMessage({ message: undefined, type: undefined });
            }, 5000);
          });
      }
    } else {
      addNewContact({
        name: newName,
        number: newNumber,
      })
        .then((res) => {
          setMessage({ message: `Added ${newName}`, type: "success" });
          setTimeout(() => {
            setMessage({ message: undefined, type: undefined });
          }, 5000);
          setPersons(persons.concat(res));
        })
        .catch((err) => {
          setMessage({ message: err.response.data.error, type: "error" });
          setTimeout(() => {
            setMessage({ message: undefined, type: undefined });
          }, 5000);
        });
    }
    setNewName("");
    setNewNumber("");
  };
  const deleteHandler = (id, name) => {
    if (window.confirm(`Delete ${name}`)) {
      deleteContact(id)
        .then((res) => {
          const newPersons = persons.filter((p) => p.id !== id);
          setPersons(newPersons);
        })
        .catch((_error) => {
          setMessage({
            message: `Information of ${name} Alredy have been delete on the server`,
            type: "success",
          });
          setTimeout(() => {
            setMessage({ message: undefined, type: undefined });
          }, 5000);
        });
    }
  };

  useEffect(() => {
    getAllContacts().then((res) => {
      setPersons(res);
    });
  }, []);
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.message} type={message.type} />
      <Filter onChangeShowAll={onChangeShowAll} />
      <h1>Add a new</h1>
      <PersonForm
        onSubmitHandler={onSubmitHandler}
        onChangeHandlerName={onChangeHandlerName}
        onChangeHandlerNumber={onChangeHandlerNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <Persons
        persons={
          showAll === ""
            ? persons
            : persons.filter((p) => p.name.toLowerCase().includes(showAll))
        }
        deleteHandler={deleteHandler}
      />
    </div>
  );
};

export default App;
