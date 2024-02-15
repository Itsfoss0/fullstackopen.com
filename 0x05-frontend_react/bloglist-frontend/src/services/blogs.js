import axios from 'axios';
const baseUrl = '/api/blogs';

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

const modifyBlog = async (id, payload, authToken) => {
  const config = {
    headers: {
      Authorization: authToken
    }
  };
  const response = await axios.put(`${baseUrl}/${id}`, payload, config);
  return response;
};

export default { getAll, createNew, modifyBlog };
