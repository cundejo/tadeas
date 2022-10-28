import { useEffect, useState } from 'react';
import { getListsByUser, List, upsertList } from '@/features/list';
import { LOCAL_STORAGE_SELECTED_LIST_ID, useLocalStorage } from '@/features/common';
import { nanoid } from 'nanoid';

type HookDto = {
  isLoading: boolean;
  listSelected?: List;
  lists: List[];
  selectList: (list: List) => void;
  addList: (name: string) => Promise<void>;
};

export const useUserLists = (ownerEmail: string): HookDto => {
  const [isLoading, setIsLoading] = useState(false);
  const [lists, setLists] = useState<List[]>([]);
  const [listSelected, setListSelected] = useState<List>();
  const { item, setItem } = useLocalStorage(LOCAL_STORAGE_SELECTED_LIST_ID);

  useEffect(() => {
    setIsLoading(true);
    let cleaning = false;

    const fetchUserLists = async () => {
      const lists = await getListsByUser(ownerEmail);
      if (cleaning) return;
      setLists(lists);
      // The selected list comes from the local storage, if it's empty we set the first list in the array.
      let list = lists.find((l) => l.id === item);
      if (!list) list = lists[0];
      setItem(list.id);
      setListSelected(list);
      setIsLoading(false);
    };
    fetchUserLists();

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
    setLists(lists);
    setIsLoading(false);
  };

  const selectList = (list: List) => {
    setListSelected(list);
    setItem(list.id);
  };

  return {
    addList,
    isLoading,
    listSelected,
    lists,
    selectList,
  };
};
