import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Header from './components/Header';
import PersonForm from './components/PersonForm';
import PhoneBook from './components/PhoneBook';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:1337/persons')
      .then(response => setPersons(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const updateFilter = (event) => {
    setFilter(event.target.value);
  };

  const handleNewNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const addName = (event) => {
    event.preventDefault();

    const nameExists = persons.some((person) => person.name === newName);
    if (nameExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPersonObj = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    };
    setPersons(persons.concat(newPersonObj));
    setNewName('');
    setNewNumber('');
  };

  const filteredContacts = filter === '' ? persons : persons.filter(person => person.name.includes(filter));
  return (
    <>
      <Header title='Phone Book' />
      <Filter filter={filter} updateFilter={updateFilter} />
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNewNameChange={handleNewNameChange}
        handleNumberChange={handleNumberChange}
      />
      <PhoneBook persons={filteredContacts} />
    </>
  );
};

export default App;
