import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { AddTaskButton, Task, taskHasChanges, TasksList, useTasks } from '@/features/task';
import { find } from 'lodash';

export const TasksContainer: React.FC = () => {
  const { tasks, isLoading, updateTask } = useTasks();
  const [taskInEdition, setTaskInEdition] = useState<Task>();

  const handleAddTask = () => {
    console.log('adding task');

    const newTask: Task = {
      id: nanoid(),
      title: '',
      createdAt: new Date().toISOString(),
    };
    updateTask(newTask);
    setTaskInEdition(newTask);
  };

  const switchSelectedTask = (newTaskId: string) => {
    // Check if there is changes in current selected task, and save if positive.
    if (taskInEdition) {
      const currentTask = find(tasks, { id: taskInEdition.id });
      if (currentTask && taskHasChanges(currentTask, taskInEdition)) updateTask(taskInEdition);
    }

    // If I clicked on the selected task do nothing
    if (taskInEdition && newTaskId === taskInEdition.id) return;

    // If is another task, switch to the new task
    const newTask = find(tasks, { id: newTaskId });
    setTaskInEdition(newTask);
  };

  return (
    <>
      <AddTaskButton onClick={handleAddTask} loading={isLoading} />
      <TasksList
        tasks={tasks}
        taskInEdition={taskInEdition}
        switchTaskSelected={switchSelectedTask}
        onChangeTask={setTaskInEdition}
      />
    </>
  );
};
