import { useState, useEffect } from 'react';

export function useDebouncedValue<V>(value: V, delay = 500): V {
 const [debounced, setDebounced] = useState<V>(value);

 useEffect(() => {
  const timer = setTimeout(() => {
   setDebounced(value);
  }, delay);

  return () => {
   clearTimeout(timer);
  };
 }, [value, delay]);

 return debounced;
}
