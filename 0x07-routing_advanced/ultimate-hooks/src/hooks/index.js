import { useState, useEffect } from 'react';
import axios from 'axios';

export const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange
  };
};

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios.get(baseUrl).then((resp) => setResources(resp.data));
  }, []);

  const create = async (resource) => {
    const resp = await axios.post(baseUrl, resource);
    setResources((previousResources) => [...previousResources, resp.data]);
  };

  const service = {
    create
  };

  return [resources, service];
};
