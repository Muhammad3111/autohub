import { useState, useEffect } from "react";

// 🔹 Harflar yozilgandan keyin 500ms kutish va oxirgi qiymatni qaytarish
export const useDebounce = (value: string, delay: number = 500): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
