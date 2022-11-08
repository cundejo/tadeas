import { createContext, Dispatch, SetStateAction } from 'react';
import { List } from '@/features/list';

export type AppContextType = {
  appContext: ContextObject;
  setAppContext: Dispatch<SetStateAction<ContextObject>>;
};

export type ContextObject = {
  selectedListId?: string;
  userLists: List[];
  userSharedLists: List[];
};

export const appContextDefault = {
  selectedListId: undefined,
  userLists: [],
  userSharedLists: [],
};

export const AppContext = createContext<AppContextType>({
  appContext: appContextDefault,
  setAppContext: () => {},
});
