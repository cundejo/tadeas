import React from 'react';
import { AddTaskButton, TasksList, useTasks, useListTasksListener } from '@/features/task';

export const Tasks: React.FC = () => {
  const { listTasks } = useListTasksListener();
  const { isSaving, completeTask, addTask, switchSelectedTask, taskInEdition, setTaskInEdition, getTasks } = useTasks(
    listTasks!
  );

  if (!listTasks) return null;

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
    </>
  );
};
