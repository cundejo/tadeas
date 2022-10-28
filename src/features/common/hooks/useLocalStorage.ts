import { useContext } from 'react';
import { AppContext } from '@/features/common';

type HookDto = {
  item: string | undefined;
  setItem: (value: string) => void;
};

export const useLocalStorage = (key: string, defaultValue?: string): HookDto => {
  const { setAppContext } = useContext(AppContext);

  // Avoiding errors when server rendering, window is not defined there.
  if (typeof window === 'undefined') return { item: undefined, setItem: () => '' };

  let item = window.localStorage.getItem(key) ?? undefined;

  if (!item && defaultValue) {
    window.localStorage.setItem(key, defaultValue);
    setAppContext((prevState) => ({ ...prevState, selectedListId: defaultValue }));
    item = defaultValue;
  }

  const setItem = (value: string) => {
    window.localStorage.setItem(key, value);
    setAppContext((prevState) => ({ ...prevState, selectedListId: value }));
  };

  return { item, setItem };
};
