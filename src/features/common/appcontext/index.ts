import { createContext, Dispatch, SetStateAction } from 'react';
import { List } from '@/features/list';

export type AppContextType = {
  appContext: ContextObject;
  setAppContext: Dispatch<SetStateAction<ContextObject>>;
};

export type ContextObject = {
  selectedListId?: string;
  userLists: List[];
};

export const appContextDefault = {
  selectedListId: undefined,
  userLists: [],
};

export const AppContext = createContext<AppContextType>({
  appContext: appContextDefault,
  setAppContext: () => {},
});
