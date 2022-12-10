import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Unsubscribe } from 'firebase/firestore';
import { ListTasks } from '@tadeas/types';
import { RootState } from '@/common';
import { getListTasksListener } from '@/features/task';

type HookDto = {
  listTasks?: ListTasks;
};

export const useListTasksListener = (): HookDto => {
  const selectedListId = useSelector((state: RootState) => state.lists.selectedListId);
  const [listTasks, setListTasks] = useState<ListTasks>();
  const listenerUnsubscribeRef = useRef<Unsubscribe | undefined>(undefined);

  useEffect(() => {
    if (!selectedListId) return;

    const subscribe = () => {
      listenerUnsubscribeRef.current = getListTasksListener(selectedListId, (listTasks: ListTasks) => {
        setListTasks(listTasks);
      });
    };

    const unsubscribe = () => {
      listenerUnsubscribeRef.current && listenerUnsubscribeRef.current();
      listenerUnsubscribeRef.current = undefined;
    };

    // Initiate list task listener as soon as we get the List Id
    subscribe();

    // Unsubscribe/Re-subscribe on visibility changes
    // https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
    const visibilityChangeListener = () => {
      if (document.hidden) {
        unsubscribe();
      } else {
        if (!listenerUnsubscribeRef.current) subscribe();
      }
    };

    document.addEventListener('visibilitychange', visibilityChangeListener);

    return () => {
      document.removeEventListener('visibilitychange', visibilityChangeListener);
      unsubscribe();
    };
  }, [selectedListId]);

  return {
    listTasks,
  };
};
