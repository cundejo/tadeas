import React from 'react';
import { styled } from '@nextui-org/react';
import { useListTasksListener, useTasks } from '@/features/task';
import { TaskCompletedPanel } from './TasksCompleted';
import { TasksPanel } from './TasksActive';

export const Tasks: React.FC = () => {
  const { listTasks } = useListTasksListener();
  const {
    addTask,
    completeTask,
    getTasks,
    getTasksCompleted,
    isCompletedTasksVisible,
    isSaving,
    setIsCompletedTasksVisible,
    setTaskInEdition,
    switchSelectedTask,
    taskInEdition,
  } = useTasks(listTasks!);

  if (!listTasks) return null;

  return (
    <Container>
      <TasksPanel
        addTask={addTask}
        completeTask={completeTask}
        isCompletedTasksVisible={isCompletedTasksVisible}
        isSaving={isSaving}
        setTaskInEdition={setTaskInEdition}
        switchSelectedTask={switchSelectedTask}
        taskInEdition={taskInEdition}
        tasks={getTasks()}
      />
      <TaskCompletedPanel
        completedTasks={getTasksCompleted()}
        onChange={setIsCompletedTasksVisible}
        visible={isCompletedTasksVisible}
      />
    </Container>
  );
};

const Container = styled('div', {
  height: 'calc(100% - 60px)',
});
