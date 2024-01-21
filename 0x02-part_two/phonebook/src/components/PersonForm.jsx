const PersonForm = ({
  newName,
  newNumber,
  handleNewNameChange,
  handleNumberChange,
  addName
}) => {
  return (
    <form onSubmit={addName}>
      <div>
        <p>
          Name: <input value={newName} onChange={handleNewNameChange} />
        </p>
        Number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

export default PersonForm;
