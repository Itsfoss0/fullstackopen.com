const generateId = (existingData) => {
  const maxId =
    existingData.length > 0
      ? Math.max(...existingData.map((person) => person.id))
      : 0;
  return maxId + 1;
};

module.exports = {
  generateId
};
