import { useState } from 'react';
import { completeTask as completeTaskApi, Task, taskHasChanges, upsertTasks as upsertTasksApi } from '@/features/task';
import { find, orderBy } from 'lodash';
import { nanoid } from 'nanoid';
import { List } from '@/features/list';

type HookDto = {
  addTask: () => void;
  completeTask: (task: Task) => void;
  getTasks: () => Task[];
  isSaving: boolean;
  setTaskInEdition: (task?: Task) => void;
  switchSelectedTask: (taskId: string) => void;
  taskInEdition?: Task;
};

export const useTasks = (list: List): HookDto => {
  const [isSaving, setIsSaving] = useState(false);
  const [taskInEdition, setTaskInEdition] = useState<Task>();

  const taskInEditionWithChanges = (): Task | undefined => {
    if (taskInEdition) {
      const currentTask = find(list.tasks, { id: taskInEdition.id });
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
    const taskWithChanges = taskInEditionWithChanges();
    if (taskWithChanges) upsertTasks([taskWithChanges]);

    // If I clicked on the same selected task do nothing.
    if (taskInEdition && newTaskId === taskInEdition.id) return;

    // If is another task, select this new one.
    const newTask = find(list.tasks, { id: newTaskId });
    setTaskInEdition(newTask);
  };

  const upsertTasks = async (tasks: Array<Task | undefined>) => {
    setIsSaving(true);
    await upsertTasksApi(tasks, list);
    setIsSaving(false);
  };

  const completeTask = async (task: Task) => {
    setIsSaving(true);
    await completeTaskApi(task.id, list);
    setIsSaving(false);
  };

  const getTasks = (): Task[] => {
    return orderBy(
      list.tasks.filter((task) => !task.completedAt),
      ['createdAt'],
      ['desc']
    );
  };

  return {
    addTask,
    completeTask,
    getTasks,
    isSaving,
    setTaskInEdition,
    switchSelectedTask,
    taskInEdition,
  };
};
