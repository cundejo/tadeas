type HookDto = {
  item: string;
  setItem: (value: string) => void;
};

export const useLocalStorage = (key: string, defaultValue?: string): HookDto => {
  // Avoiding errors when server rendering, window is not defined there.
  if (typeof window === 'undefined') return { item: '', setItem: () => '' };

  let item = window.localStorage.getItem(key) ?? '';

  if (!item && defaultValue) {
    window.localStorage.setItem(key, defaultValue);
    item = defaultValue;
  }

  const setItem = (value: string) => {
    window.localStorage.setItem(key, value);
  };

  return { item, setItem };
};
