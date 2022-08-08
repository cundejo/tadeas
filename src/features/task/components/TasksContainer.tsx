import React, { useState } from 'react';
import { AddTaskButton, Task, TasksList, useTasks } from '@/features/task';

export const TasksContainer: React.FC = () => {
  const { tasks, isLoading } = useTasks();

  console.log('tasks', tasks);
  console.log('isLoading', isLoading);

  const handleAddTask = () => {
    console.log('add task');
  };

  return (
    <>
      <AddTaskButton onClick={handleAddTask} />
      <TasksList tasks={tasks} />
    </>
  );
};
