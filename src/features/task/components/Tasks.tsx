import React from 'react';
import { AddTaskButton, TasksList, useTasks, useListTasksListener } from '@/features/task';
import { TasksCompleted } from '@/features/task/components/TasksCompleted';
import { styled } from '@nextui-org/react';

export const Tasks: React.FC = () => {
  const { listTasks } = useListTasksListener();
  const { isSaving, completeTask, addTask, switchSelectedTask, taskInEdition, setTaskInEdition, getTasks } = useTasks(
    listTasks!
  );

  if (!listTasks) return null;

  console.log('listTasks', listTasks);

  return (
    <Container>
      <AddTaskButton onClick={addTask} loading={isSaving} />
      <TasksList
        tasks={getTasks()}
        taskInEdition={taskInEdition}
        switchTaskSelected={switchSelectedTask}
        onChangeTask={setTaskInEdition}
        onComplete={completeTask}
      />
      <TasksCompleted completedTasks={listTasks.tasksCompleted} />
    </Container>
  );
};

const Container = styled('div', {
  // pt: '76px',
  bg: 'green',
  flexGrow: 1,
  flexDirection: 'column',
  overflow: 'auto',
});
