import React from 'react';
import { styled } from '@nextui-org/react';
import { Task } from '@/features/task';
import { TasksCompletedList } from './TasksCompletedList';

type Props = {
  completedTasks: Task[];
  visible: boolean;
  onChange: (isVisible: boolean) => void;
};

export const TaskCompletedPanel: React.FC<Props> = ({ visible, completedTasks, onChange }) => {
  return (
    <Container>
      <Title tabIndex={0} onClick={() => onChange(!visible)}>
        Completed ({completedTasks.length})
      </Title>
      {visible && <TasksCompletedList tasks={completedTasks} />}
    </Container>
  );
};

const Container = styled('div', {
  bg: '$gray50',
  display: 'block',
  position: 'sticky',
  bottom: 0,
  zIndex: 200,
});

const Title = styled('div', {
  display: 'flex',
  alignItems: 'center',
  height: '50px',
  padding: '0 $md',
  fontSize: '$lg',
  color: '$accents7',
  cursor: 'pointer',
});
