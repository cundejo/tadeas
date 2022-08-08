import { useEffect, useState } from 'react';
import { Task, getTasks } from '@/features/task';

type HookDto = {
  tasks: Task[];
  isLoading: boolean;
  reload: () => void;
};

export const useTasks = (): HookDto => {
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setIsLoading(true);
    let cleaning = false;
    getTasks()
      .then((tasks) => {
        if (!cleaning) setTasks(tasks);
      })
      .finally(() => setIsLoading(false));

    return () => {
      cleaning = true;
    };
  }, []);

  const reload = () => {
    (async () => {
      setTasks(await getTasks());
    })();
  };

  return { tasks, isLoading, reload };
};
