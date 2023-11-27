import { useEffect, useState } from "react";

export default function UseLocalStorageState(key, defaultValue) {
  const loadFromLocalStorage = () => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  };

  const saveToLocalStorage = (data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const [state, setState] = useState(() => loadFromLocalStorage());

  useEffect(() => {
    saveToLocalStorage(state);
  }, [state, key]);

  return [state, setState];
}
