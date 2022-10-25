import { useState } from 'react';
import {
  completeTask as completeTaskApi,
  Task,
  taskHasChanges,
  undoCompleteTask as undoCompleteTaskApi,
  upsertTask,
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
  undoCompleteTask: (task: Task) => void;
};

export const useTasks = (list?: List): HookDto => {
  const [isLoading, setIsLoading] = useState(!!list);
  const [taskInEdition, setTaskInEdition] = useState<Task>();
  const [tasksCompletedRecently, setTasksCompletedRecently] = useState<Task>();

  const saveTaskInEdition = () => {
    // Check if there is changes in current selected task, and save if positive.
    if (taskInEdition) {
      const currentTask = find(list?.tasks, { id: taskInEdition.id });
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
    const newTask = find(list?.tasks, { id: newTaskId });
    setTaskInEdition(newTask);
  };

  const updateTask = async (task: Task) => {
    setIsLoading(true);
    await upsertTask(task, list!);
    setIsLoading(false);
  };

  const completeTask = async (task: Task) => {
    setIsLoading(true);
    await completeTaskApi(task.id, list!);
    setTasksCompletedRecently(task);
    setIsLoading(false);
  };

  const undoCompleteTask = async (task: Task) => {
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
