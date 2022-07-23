import { useState } from 'react';

export const useField = (type, regExp) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);

  const onChange = (event) => {
    setValue(event.target.value);
    setError(regExp?.test(event.target.value) ? null : 'Invalid value');
  };

  const reset = () => {
    setValue('');
    setError(null);
  };

  return {
    type,
    value,
    error,
    reset,
    onChange
  };
};