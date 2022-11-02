import { useContext, useEffect, useState } from 'react';
import { getListsByUser, List, upsertList, deleteList as deleteListApi } from '@/features/list';
import { AppContext, LOCAL_STORAGE_SELECTED_LIST_ID, useLocalStorage } from '@/features/common';
import { nanoid } from 'nanoid';
import { find, isEmpty } from 'lodash';

type HookDto = {
  addList: (name: string) => Promise<void>;
  deleteList: (list: List) => Promise<void>;
  editList: (list: List) => Promise<void>;
  isLoading: boolean;
  listSelected?: List;
  lists: List[];
  selectList: (list: List) => void;
};

export const useUserLists = (ownerEmail: string): HookDto => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    appContext: { selectedListId, userLists },
    setAppContext,
  } = useContext(AppContext);
  const { item, setItem } = useLocalStorage(LOCAL_STORAGE_SELECTED_LIST_ID);

  useEffect(() => {
    setIsLoading(true);
    let cleaning = false;

    (async () => {
      const lists = await getListsByUser(ownerEmail);
      if (cleaning) return;
      // The selected list comes from the local storage, if it's empty we set the first list in the array.
      let list = lists.find((l) => l.id === item);
      if (!list) list = lists[0];
      setItem(list.id);
      setAppContext({ userLists: lists, selectedListId: list.id });
      setIsLoading(false);
    })();

    return () => {
      cleaning = true;
    };
  }, []);

  const addList = async (name: string) => {
    setIsLoading(true);

    const newList: List = {
      id: nanoid(),
      tasks: [],
      name,
      owner: ownerEmail,
      sharedWith: [],
    };

    await upsertList(newList);
    const lists = await getListsByUser(ownerEmail);
    setAppContext({ userLists: lists, selectedListId: newList.id });
    setItem(newList.id);
    setIsLoading(false);
  };

  const editList = async (list: List) => {
    setIsLoading(true);
    await upsertList(list);
    const lists = await getListsByUser(ownerEmail);
    setAppContext((prev) => ({ ...prev, userLists: lists }));
    setIsLoading(false);
  };

  const deleteList = async (list: List) => {
    // Avoid deleting the list that is created by default with new users.
    if (list.isDefault) return;

    setIsLoading(true);
    const lists = userLists.filter(({ id }) => id !== list.id);
    setItem(lists[0].id);
    setAppContext({ userLists: lists, selectedListId: lists[0].id });
    await deleteListApi(list);
    setIsLoading(false);
  };

  const selectList = (list: List) => {
    setAppContext((prev) => ({ ...prev, selectedListId: list.id }));
    setItem(list.id);
  };

  return {
    addList,
    deleteList,
    editList,
    isLoading: isLoading || isEmpty(userLists),
    listSelected: find(userLists, { id: selectedListId }),
    lists: userLists,
    selectList,
  };
};
