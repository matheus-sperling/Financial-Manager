import { useState, useEffect } from 'react';

export function useClientStorage<T>(key: string, defaultValue: T): [T, (value: T | ((prev: T) => T)) => void, boolean] {
  const [value, setValue] = useState<T>(defaultValue);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load value from localStorage on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(key);
        setValue(stored ? JSON.parse(stored) : defaultValue);
      } catch (error) {
        console.error(`Error loading ${key} from localStorage:`, error);
        setValue(defaultValue);
      } finally {
        setIsLoaded(true);
      }
    }
  }, [key]); // Remove defaultValue from dependencies

  // Save value to localStorage when it changes
  const setStoredValue = (newValue: T | ((prev: T) => T)) => {
    try {
      const valueToSet = typeof newValue === 'function' ? (newValue as (prev: T) => T)(value) : newValue;
      setValue(valueToSet);
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(valueToSet));
      }
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  return [value, setStoredValue, isLoaded];
}