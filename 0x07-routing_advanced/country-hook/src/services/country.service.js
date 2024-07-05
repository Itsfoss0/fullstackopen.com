import axios from 'axios';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name';

export const getCountryData = async (country) => {
  const resp = await axios.get(`${baseUrl}/${country}`);
  return resp;
};
