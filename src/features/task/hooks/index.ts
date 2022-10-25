import { useState } from 'react';
import {
  completeTask as completeTaskApi,
  Task,
  taskHasChanges,
  undoCompleteTask as undoCompleteTaskApi,
  upsertTasks as upsertTasksApi,
} from '@/features/task';
import { find } from 'lodash';
import { nanoid } from 'nanoid';
import { List } from '@/features/list';
import { stringSort } from '@/features/common';

type HookDto = {
  addTask: () => void;
  completeTask: (task: Task) => void;
  getTasks: () => Task[];
  isLoading: boolean;
  setTaskInEdition: (task?: Task) => void;
  switchSelectedTask: (taskId: string) => void;
  taskInEdition?: Task;
  tasksCompletedRecently?: Task;
  undoCompleteTask: (task?: Task) => void;
};

export const useTasks = (list?: List): HookDto => {
  const [isLoading, setIsLoading] = useState(!!list);
  const [taskInEdition, setTaskInEdition] = useState<Task>();
  const [tasksCompletedRecently, setTasksCompletedRecently] = useState<Task>();

  const taskInEditionWithChanges = (): Task | undefined => {
    if (taskInEdition) {
      const currentTask = find(list?.tasks, { id: taskInEdition.id });
      if (currentTask && taskHasChanges(currentTask, taskInEdition)) return taskInEdition;
    }
    return undefined;
  };

  const addTask = () => {
    // If there is changes in current selected task, get it to posterior save.
    const currentTask = taskInEditionWithChanges();

    const newTask: Task = {
      id: nanoid(),
      title: '',
      createdAt: new Date().toISOString(),
    };
    upsertTasks([currentTask, newTask]);
    setTaskInEdition(newTask);
  };

  const switchSelectedTask = (newTaskId: string) => {
    // Update in edition task if there is changes.
    upsertTasks([taskInEditionWithChanges()]);

    // If I clicked on the same selected task do nothing.
    if (taskInEdition && newTaskId === taskInEdition.id) return;

    // If is another task, select this new one.
    const newTask = find(list?.tasks, { id: newTaskId });
    setTaskInEdition(newTask);
  };

  const upsertTasks = async (tasks: Array<Task | undefined>) => {
    setIsLoading(true);
    await upsertTasksApi(tasks, list!);
    setIsLoading(false);
  };

  const completeTask = async (task: Task) => {
    setIsLoading(true);
    await completeTaskApi(task.id, list!);
    setTasksCompletedRecently(task);
    setIsLoading(false);
  };

  const undoCompleteTask = async (task?: Task) => {
    if (!task) return;
    setIsLoading(true);
    await undoCompleteTaskApi(task.id, list!);
    setTasksCompletedRecently(undefined);
    setIsLoading(false);
  };

  const getTasks = (): Task[] => {
    if (!list) return [];
    return list.tasks.filter((task) => !task.completedAt).sort((a, b) => stringSort(b.createdAt, a.createdAt));
  };

  return {
    addTask,
    completeTask,
    getTasks,
    isLoading,
    setTaskInEdition,
    switchSelectedTask,
    taskInEdition,
    tasksCompletedRecently,
    undoCompleteTask,
  };
};
