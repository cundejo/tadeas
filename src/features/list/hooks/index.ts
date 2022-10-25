import { useEffect, useState } from 'react';
import { getListListener, List } from '@/features/list';

type HookDto = {
  isLoading: boolean;
  list?: List;
};

export const useList = (): HookDto => {
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState<List>();

  const onListReceived = (list: List) => {
    setList(list);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const listListenerUnsubscribe = getListListener('LIST_ID', onListReceived);
    return () => listListenerUnsubscribe();
  }, []);

  return {
    isLoading,
    list,
  };
};
