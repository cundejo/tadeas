import { useEffect, useState } from 'react';
import { getListListener, List } from '@/features/list';
import { RootState } from '@/features/common';
import { useSelector } from 'react-redux';

type HookDto = {
  isLoading: boolean;
  list?: List;
};

export const useListListener = (): HookDto => {
  const selectedListId = useSelector((state: RootState) => state.lists.selectedListId);
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
    setIsLoading(false);
  };

  return {
    isLoading,
    list,
  };
};
