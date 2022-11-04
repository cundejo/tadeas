import { useContext, useEffect, useState } from 'react';
import { getListListener, List } from '@/features/list';
import { AppContext } from '@/features/common';
import { findIndex } from 'lodash';

type HookDto = {
  isLoading: boolean;
  list?: List;
};

export const useListListener = (): HookDto => {
  const {
    appContext: { selectedListId, userLists },
    setAppContext,
  } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState<List>();

  useEffect(() => {
    setIsLoading(true);
    if (!selectedListId) return;
    const listListenerUnsubscribe = getListListener(selectedListId, onListReceived);
    return () => listListenerUnsubscribe();
  }, [selectedListId]);

  const onListReceived = (list: List) => {
    setList(list);
    updateListInContext(list);
    setIsLoading(false);
  };

  const updateListInContext = (list: List) => {
    const lists = [...userLists];
    const listIndex = findIndex(lists, { id: list.id });
    if (listIndex >= 0) lists.splice(listIndex, 1, list);
    else lists.push(list);
    setAppContext((prev) => ({ ...prev, userLists: lists }));
  };

  return {
    isLoading,
    list,
  };
};
