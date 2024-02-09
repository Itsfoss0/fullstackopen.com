import axios from 'axios';
const baseUrl = 'http://localhost:1337/api/blogs';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (authToken, payload) => {
  const config = {
    headers: {
      Authorization: authToken
    }
  };
  const response = await axios.post(baseUrl, payload, config);
  console.log(response);
  return response;
};

export default { getAll, createNew };
