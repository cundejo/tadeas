import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import { AddTaskButton, Task, taskHasChanges, TasksList, useTasks } from '@/features/task';
import { find } from 'lodash';
import { CompletedNotification } from '@/features/task/components/CompletedNotification';

export const TasksContainer: React.FC = () => {
  const { tasks, isLoading, updateTask, completeTask, undoCompleteTask } = useTasks();
  const [taskInEdition, setTaskInEdition] = useState<Task>();
  const [tasksCompletedRecently, setTasksCompletedRecently] = useState<Task>();

  const handleAddTask = () => {
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

  const handleComplete = async (task: Task) => {
    completeTask(task);
    setTasksCompletedRecently(task);
  };

  const handleUndoComplete = (task: Task) => {
    undoCompleteTask(task);
    setTasksCompletedRecently(undefined);
  };

  console.log('tasksCompletedRecently', tasksCompletedRecently);

  return (
    <>
      <AddTaskButton onClick={handleAddTask} loading={isLoading} />
      <TasksList
        tasks={tasks}
        taskInEdition={taskInEdition}
        switchTaskSelected={switchSelectedTask}
        onChangeTask={setTaskInEdition}
        onComplete={handleComplete}
      />
      <CompletedNotification tasksCompletedRecently={tasksCompletedRecently} onUndo={handleUndoComplete} />
    </>
  );
};
