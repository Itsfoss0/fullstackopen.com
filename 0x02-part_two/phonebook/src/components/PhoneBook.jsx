const PhoneBookEntry = ({ person, deletePerson }) => {
  return (
    <>
      <div>
        {person.name}: {person.number} <span />
        <button onClick={deletePerson}> Delete </button>
      </div>

    </>
  );
};
export default PhoneBookEntry;
