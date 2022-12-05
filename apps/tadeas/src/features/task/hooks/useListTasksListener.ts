import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/common';
import { getListTasksListener, ListTasks } from '@/features/task';

type HookDto = {
  listTasks?: ListTasks;
};

export const useListTasksListener = (): HookDto => {
  const selectedListId = useSelector((state: RootState) => state.lists.selectedListId);
  const [listTasks, setListTasks] = useState<ListTasks>();

  useEffect(() => {
    if (!selectedListId) return;
    const listTasksListenerUnsubscribe = getListTasksListener(selectedListId, onListTasksReceived);
    return () => listTasksListenerUnsubscribe();
  }, [selectedListId]);

  const onListTasksReceived = (listTasks: ListTasks) => {
    setListTasks(listTasks);
  };

  return {
    listTasks,
  };
};
