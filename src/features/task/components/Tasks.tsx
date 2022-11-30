import React from 'react';
import { AddTaskButton, TasksList, useTasks, useListTasksListener } from '@/features/task';
import { styled } from '@nextui-org/react';
import { TaskCompletedPanel } from './TasksCompleted';

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
      <Content className="content" collapsed={isCompletedTasksVisible}>
        <AddTaskButton onClick={addTask} loading={isSaving} />
        <TasksList
          tasks={getTasks()}
          taskInEdition={taskInEdition}
          switchTaskSelected={switchSelectedTask}
          onChangeTask={setTaskInEdition}
          onComplete={completeTask}
        />
      </Content>
      <TaskCompletedPanel
        visible={isCompletedTasksVisible}
        completedTasks={getTasksCompleted()}
        onChange={setIsCompletedTasksVisible}
      />
    </Container>
  );
};

const Container = styled('div', {
  height: 'calc(100% - 60px)',
});

const Content = styled('div', {
  display: 'block',
  padding: '0 $md',
  height: 'calc(100% - 50px)',
  overflow: 'scroll',

  variants: {
    collapsed: {
      true: {
        height: 'calc(100% - 50px - 30vh)',
      },
    },
  },
});
