import axios from 'axios';

const url = 'http://localhost:1337/persons';

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
  return axios.put(`${url}/${newContact.id}`);
};
export default {
  getAllContacts,
  createContact,
  deleteContactById,
  modifyContact
};
