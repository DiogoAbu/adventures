import { useCallback, useState } from 'react';

/**
 * Return state as value and memoized setter for state
 */
const useInputValue = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const onChangeText = useCallback((text: string) => {
    setValue(text);
  }, []);

  return {
    value,
    onChangeText,
  };
};

export default useInputValue;
