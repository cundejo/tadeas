import { useState } from 'react';
import { compact, debounce, find, orderBy } from 'lodash';
import { nanoid } from 'nanoid';
import { ListTasks, Task } from '@tadeas/types';
import {
  completeTask as completeTaskApi,
  reactivateTask as reactivateTaskApi,
  taskHasChanges,
  upsertTasks as upsertTasksApi,
} from '@/features/task';

type HookDto = {
  addTask: () => void;
  completeTask: (task: Task) => void;
  reactivateTask: (task: Task) => void;
  getTasks: () => Task[];
  getTasksCompleted: () => Task[];
  isCompletedTasksVisible: boolean;
  isSaving: boolean;
  setIsCompletedTasksVisible: (visible: boolean) => void;
  setTaskInEdition: (task?: Task) => void;
  switchSelectedTask: (taskId: string) => void;
  taskInEdition?: Task;
};

export const useTasks = (listTasks: ListTasks): HookDto => {
  const [isSaving, setIsSaving] = useState(false);
  const [isCompletedTasksVisible, setIsCompletedTasksVisible] = useState(false);
  const [taskInEdition, setTaskInEdition] = useState<Task>();

  const taskInEditionWithChanges = (): Task | undefined => {
    if (taskInEdition) {
      const currentTask = find(listTasks.tasks, { id: taskInEdition.id });
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
    upsertTasks(compact([currentTask, newTask]));
    setTaskInEdition(newTask);
  };

  const switchSelectedTask = (newTaskId: string) => {
    // Update in edition task if there is changes.
    const taskWithChanges = taskInEditionWithChanges();
    if (taskWithChanges) upsertTasks([taskWithChanges]);

    // If I clicked on the same selected task do nothing.
    if (taskInEdition && newTaskId === taskInEdition.id) return;

    // If is another task, select this new one.
    const newTask = find(listTasks.tasks, { id: newTaskId });
    setTaskInEdition(newTask);
  };

  // Debouncing isSaving = true for some milliseconds to not make unnecessary UI re-renderings.
  const savingWithDebounce = async (func: any) => {
    const debounced = debounce(() => setIsSaving(true), 400);
    await func();
    debounced.cancel();
    setIsSaving(false);
  };

  const upsertTasks = async (tasks: Task[]) => {
    savingWithDebounce(() => upsertTasksApi(listTasks, tasks, []));
  };

  const completeTask = async (task: Task) => {
    savingWithDebounce(() => completeTaskApi(task.id, listTasks));
  };

  const reactivateTask = async (task: Task) => {
    savingWithDebounce(() => reactivateTaskApi(task.id, listTasks));
  };

  const getTasks = (): Task[] => {
    return orderBy(listTasks.tasks, ['createdAt'], ['desc']);
  };

  const getTasksCompleted = (): Task[] => {
    return orderBy(listTasks.tasksCompleted, ['completedAt'], ['desc']);
  };

  return {
    addTask,
    completeTask,
    reactivateTask,
    getTasks,
    getTasksCompleted,
    isCompletedTasksVisible,
    isSaving,
    setIsCompletedTasksVisible,
    setTaskInEdition,
    switchSelectedTask,
    taskInEdition,
  };
};
