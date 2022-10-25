import React from 'react';
import { AddTaskButton, TasksList, useTasks, CompletedNotification } from '@/features/task';
import { useList } from '@/features/list';

export const TasksContainer: React.FC = () => {
  const { list, isLoading: isLoadingList } = useList();
  const {
    isLoading: isLoadingTasks,
    completeTask,
    undoCompleteTask,
    addTask,
    switchSelectedTask,
    taskInEdition,
    setTaskInEdition,
    tasksCompletedRecently,
    getTasks,
  } = useTasks(list);

  return (
    <>
      <AddTaskButton onClick={addTask} loading={isLoadingList || isLoadingTasks} />
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
