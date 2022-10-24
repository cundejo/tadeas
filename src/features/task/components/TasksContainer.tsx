import React from 'react';
import { AddTaskButton, TasksList, useTasks } from '@/features/task';
import { CompletedNotification } from '@/features/task/components/CompletedNotification';

export const TasksContainer: React.FC = () => {
  const {
    tasks,
    isLoading,
    completeTask,
    undoCompleteTask,
    addTask,
    switchSelectedTask,
    taskInEdition,
    setTaskInEdition,
    tasksCompletedRecently,
  } = useTasks();

  return (
    <>
      <AddTaskButton onClick={addTask} loading={isLoading} />
      <TasksList
        tasks={tasks}
        taskInEdition={taskInEdition}
        switchTaskSelected={switchSelectedTask}
        onChangeTask={setTaskInEdition}
        onComplete={completeTask}
      />
      <CompletedNotification tasksCompletedRecently={tasksCompletedRecently} onUndo={undoCompleteTask} />
    </>
  );
};
