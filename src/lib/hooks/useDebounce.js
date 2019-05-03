import { useState, useEffect } from "react";


export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounceValue(value), delay);

    return () => clearTimeout(handler);
  }, [value]);

  return debouncedValue;
};
