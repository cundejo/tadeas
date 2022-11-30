import React from 'react';
import { Task } from '@/features/task';
import { styled } from '@nextui-org/react';
import { TaskCompleted } from './TaskCompleted';

type Props = {
  tasks: Task[];
};

export const TasksCompletedList: React.FC<Props> = ({ tasks }) => {
  return (
    <Container>
      {tasks.map((task) => (
        <TaskCompleted key={task.id} task={task} />
      ))}
    </Container>
  );
};

const Container = styled('div', {
  ml: '$md',
  overflow: 'auto',
  height: '30vh',
});
