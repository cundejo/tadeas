import { useEffect, useState } from 'react';
import { Task, getTasksListener, updateTask as updateTaskApi } from '@/features/task';

type HookDto = {
  tasks: Task[];
  isLoading: boolean;
  updateTask: (task: Task) => void;
};

export const useTasks = (): HookDto => {
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const onTasksReceived = (tasks: Task[]) => {
    setTasks(tasks);
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    const taskListenerUnsubscribe = getTasksListener(onTasksReceived);
    return () => taskListenerUnsubscribe();
  }, []);

  const updateTask = async (task: Task) => {
    setIsLoading(true);
    await updateTaskApi(task);
    setIsLoading(false);
  };

  return { tasks, isLoading, updateTask };
};
