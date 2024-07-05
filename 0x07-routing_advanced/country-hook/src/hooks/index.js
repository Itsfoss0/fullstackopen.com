import React, { useState, useEffect } from 'react';
import { getCountryData } from '../services/country.service';

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

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  getCountryData(name);
  useEffect(() => {
    const resp = getCountryData(name);
    setCountry(resp);
  });

  return country;
};
