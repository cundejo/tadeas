import { createContext, Dispatch, SetStateAction } from 'react';

export type AppContextType = {
  appContext: ContextObject;
  setAppContext: Dispatch<SetStateAction<ContextObject>>;
};

export type ContextObject = {
  selectedListId?: string;
};

export const appContextDefault = {
  selectedListId: undefined,
};

export const AppContext = createContext<AppContextType>({
  appContext: appContextDefault,
  setAppContext: () => {},
});
