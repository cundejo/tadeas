import React from 'react';
import { AddTaskButton, TasksList, useTasks } from '@/features/task';
import { useListListener } from '@/features/list';

export const Tasks: React.FC = () => {
  const { list } = useListListener();
  const { isSaving, completeTask, addTask, switchSelectedTask, taskInEdition, setTaskInEdition, getTasks } = useTasks(
    list!
  );

  if (!list) return null;

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
