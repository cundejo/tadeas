import React from 'react';
import { AddTaskButton, CompletedNotification, TasksList, useTasks } from '@/features/task';
import { useList } from '@/features/list';

export const TasksPage: React.FC = () => {
  const { list, isLoading: isLoadingList } = useList();
  const {
    isSaving,
    completeTask,
    undoCompleteTask,
    addTask,
    switchSelectedTask,
    taskInEdition,
    setTaskInEdition,
    tasksCompletedRecently,
    getTasks,
  } = useTasks(list);

  if (!list || isLoadingList) return null;

  return (
    <>
      <AddTaskButton onClick={addTask} loading={isSaving} />
      <TasksList
        tasks={getTasks()}
        taskInEdition={taskInEdition}
        switchTaskSelected={switchSelectedTask}
        onChangeTask={setTaskInEdition}
        onComplete={completeTask}
      />
      <CompletedNotification tasksCompletedRecently={tasksCompletedRecently} onUndo={undoCompleteTask} />
    </>
  );
};
