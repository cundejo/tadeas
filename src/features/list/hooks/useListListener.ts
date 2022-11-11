import { useEffect, useState } from 'react';
import { getListListener, List } from '@/features/list';
import { RootState } from '@/features/common';
import { useSelector } from 'react-redux';

type HookDto = {
  list?: List;
};

export const useListListener = (): HookDto => {
  const selectedListId = useSelector((state: RootState) => state.lists.selectedListId);
  const [list, setList] = useState<List>();

  useEffect(() => {
    if (!selectedListId) return;
    const listListenerUnsubscribe = getListListener(selectedListId, onListReceived);
    return () => listListenerUnsubscribe();
  }, [selectedListId]);

  const onListReceived = (list: List) => {
    setList(list);
  };

  return {
    list,
  };
};
