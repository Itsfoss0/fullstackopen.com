import axios from 'axios';

const url = 'http://localhost:1337/api/persons';

const getAllContacts = () => {
  return axios.get(url);
};

const createContact = (newContactObj) => {
  return axios.post(url, newContactObj);
};

const deleteContactById = (contactId) => {
  return axios.delete(`${url}/${contactId}`);
};

const modifyContact = (newContact) => {
  return axios.put(`${url}/${newContact.id}`, newContact);
};
export default {
  getAllContacts,
  createContact,
  deleteContactById,
  modifyContact
};
