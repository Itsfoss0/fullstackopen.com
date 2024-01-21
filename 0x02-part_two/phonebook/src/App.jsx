import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Header from './components/Header';
import PersonForm from './components/PersonForm';
import PhoneBookEntry from './components/PhoneBook';
import contactServices from './services/contacts';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    contactServices
      .getAllContacts()
      .then((response) => setPersons(response.data))
      .catch((error) => console.error('Error fetching data:', error));
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
      const personToUpdate = persons.find(person => person.name === newName);
      if (window.confirm(`${personToUpdate.name} Already exists, Change their contact instead?`)) {
        contactServices
          .modifyContact({ ...personToUpdate, number: newNumber })
          .then(response => {
            setPersons(persons.concat(response.data));
            setNewName('');
            setNewNumber('');
          })
          .catch(err => console.error(err.message));
      }
      return;
    }

    const newPersonObj = {
      name: newName,
      number: newNumber,
      id: (persons.length + 1).toString()
    };

    contactServices
      .createContact(newPersonObj)
      .then((response) => {
        setPersons(persons.concat(response.data));
        setNewName('');
        setNewNumber('');
      })
      .catch((err) => console.log(err.message));
  };

  const deletePerson = (nId) => {
    const personToDelete = persons.find(person => person.id === nId);
    if (window.confirm(`Are you sure you want to delete ${personToDelete.name}`)) {
      contactServices
        .deleteContactById(nId)
        .then(response => {
          setPersons(persons.filter(person => person.id !== response.data.id));
        });
    }
  };

  const filteredContacts =
    filter === ''
      ? persons
      : persons.filter((person) => person.name.includes(filter));

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
      {filteredContacts.map(person => {
        return (
          <PhoneBookEntry
            key={person.id}
            person={person}
            deletePerson={() => deletePerson(person.id)}
          />
        );
      })}
    </>
  );
};

export default App;
