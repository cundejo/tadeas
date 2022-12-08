import React from 'react';
import { styled } from '@nextui-org/react';
import { Task } from '@tadeas/types';
import { TaskCompleted } from './TaskCompleted';

type Props = {
  tasks: Task[];
  onReactivate: (task: Task) => void;
};

export const TasksCompletedList: React.FC<Props> = ({ tasks, onReactivate }) => {
  return (
    <Container>
      {tasks.map((task) => (
        <TaskCompleted key={task.id} task={task} onUnmark={onReactivate} />
      ))}
    </Container>
  );
};

const Container = styled('div', {
  ml: '$md',
  overflow: 'auto',
  height: '30vh',
});
