import { useContext, useEffect, useState } from 'react';
import { getListListener, List } from '@/features/list';
import { AppContext } from '@/features/common';

type HookDto = {
  isLoading: boolean;
  list?: List;
};

export const useList = (): HookDto => {
  const { appContext } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState<List>();

  useEffect(() => {
    setIsLoading(true);
    if (!appContext.selectedListId) return;
    const listListenerUnsubscribe = getListListener(appContext.selectedListId, onListReceived);
    return () => listListenerUnsubscribe();
  }, [appContext.selectedListId]);

  const onListReceived = (list: List) => {
    setList(list);
    setIsLoading(false);
  };

  return {
    isLoading,
    list,
  };
};
