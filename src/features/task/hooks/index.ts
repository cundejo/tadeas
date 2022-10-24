import { useEffect, useState } from 'react';
import {
  completeTask as completeTaskApi,
  getTasksListener,
  Task,
  taskHasChanges,
  undoCompleteTask as undoCompleteTaskApi,
  updateTask as updateTaskApi,
} from '@/features/task';
import { find } from 'lodash';
import { nanoid } from 'nanoid';

type HookDto = {
  addTask: () => void;
  completeTask: (task: Task) => void;
  isLoading: boolean;
  setTaskInEdition: (task?: Task) => void;
  switchSelectedTask: (taskId: string) => void;
  taskInEdition?: Task;
  tasks: Task[];
  tasksCompletedRecently?: Task;
  undoCompleteTask: (task: Task) => void;
};

export const useTasks = (): HookDto => {
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskInEdition, setTaskInEdition] = useState<Task>();
  const [tasksCompletedRecently, setTasksCompletedRecently] = useState<Task>();

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

  const saveTaskInEdition = () => {
    // Check if there is changes in current selected task, and save if positive.
    if (taskInEdition) {
      const currentTask = find(tasks, { id: taskInEdition.id });
      if (currentTask && taskHasChanges(currentTask, taskInEdition)) updateTask(taskInEdition);
    }
  };

  const addTask = () => {
    saveTaskInEdition();

    const newTask: Task = {
      id: nanoid(),
      title: '',
      createdAt: new Date().toISOString(),
    };
    updateTask(newTask);
    setTaskInEdition(newTask);
  };

  const switchSelectedTask = (newTaskId: string) => {
    saveTaskInEdition();

    // If I clicked on the selected task do nothing
    if (taskInEdition && newTaskId === taskInEdition.id) return;

    // If is another task, switch to the new task
    const newTask = find(tasks, { id: newTaskId });
    setTaskInEdition(newTask);
  };

  const updateTask = async (task: Task) => {
    setIsLoading(true);
    await updateTaskApi(task);
    setIsLoading(false);
  };

  const completeTask = async (task: Task) => {
    setIsLoading(true);
    await completeTaskApi(task);
    setTasksCompletedRecently(task);
    setIsLoading(false);
  };

  const undoCompleteTask = async (task: Task) => {
    setIsLoading(true);
    await undoCompleteTaskApi(task);
    setTasksCompletedRecently(undefined);
    setIsLoading(false);
  };

  return {
    addTask,
    completeTask,
    isLoading,
    setTaskInEdition,
    switchSelectedTask,
    taskInEdition,
    tasks,
    tasksCompletedRecently,
    undoCompleteTask,
  };
};
