import { useEffect, useState } from 'react';
import {
  completeTask as completeTaskApi,
  getTasksListener,
  Task,
  undoCompleteTask as undoCompleteTaskApi,
  updateTask as updateTaskApi,
} from '@/features/task';

type HookDto = {
  tasks: Task[];
  isLoading: boolean;
  updateTask: (task: Task) => void;
  completeTask: (task: Task) => void;
  undoCompleteTask: (task: Task) => void;
};

export const useTasks = (): HookDto => {
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const onTasksReceived = (tasks: Task[]) => {
    // Filter out tasks that has been completed
    setTasks(tasks.filter((task) => !task.completedAt));
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

  const completeTask = async (task: Task) => {
    setIsLoading(true);
    await completeTaskApi(task);
    setIsLoading(false);
  };

  const undoCompleteTask = async (task: Task) => {
    setIsLoading(true);
    await undoCompleteTaskApi(task);
    setIsLoading(false);
  };

  return { tasks, isLoading, updateTask, completeTask, undoCompleteTask };
};
