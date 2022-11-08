import { useContext } from 'react';
import { AppContext, LOCAL_STORAGE_SELECTED_LIST_ID, useLocalStorage } from '@/features/common';
import { List } from '@/features/list';

type SetContextDto = {
  userLists?: List[];
  listsSharedWithMe?: List[];
  selectedList?: List;
};

type HookDto = {
  selectedListId?: string;
  setContext: (contextDto: SetContextDto) => void;
  userLists: List[];
  userSharedLists: List[];
};

export const useAppContext = (): HookDto => {
  const { setItem: setSelectedListIdLocalStorage } = useLocalStorage(LOCAL_STORAGE_SELECTED_LIST_ID);
  const {
    appContext: { userLists, selectedListId, userSharedLists },
    setAppContext,
  } = useContext(AppContext);

  const setContext = ({ userLists, listsSharedWithMe, selectedList }: SetContextDto) => {
    if (selectedList) setSelectedListIdLocalStorage(selectedList.id);

    setAppContext((prev) => ({
      ...prev,
      selectedListId: selectedList?.id ?? prev.selectedListId,
      userLists: userLists ?? prev.userLists,
      userSharedLists: listsSharedWithMe ?? prev.userSharedLists,
    }));
  };

  return {
    userLists,
    selectedListId,
    userSharedLists,
    setContext,
  };
};
