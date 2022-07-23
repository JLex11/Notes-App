import { useState } from 'react';

export const useField = ({type, regExp}) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);

  const onChange = (event) => {
    setValue(event.target.value);
    
    if (regExp) {
      if (regExp.test(event.target.value)) {
        setError(null);
      } else {
        setError('Incorrect value');
      }
    }
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