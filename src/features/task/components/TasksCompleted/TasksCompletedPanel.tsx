import React from 'react';
import { styled } from '@nextui-org/react';
import { Task } from '@/features/task';
import { TasksCompletedList } from './TasksCompletedList';
import { isEmpty } from 'lodash';

type Props = {
  completedTasks: Task[];
  onChange: (isVisible: boolean) => void;
  reactivateTask: (task: Task) => void;
  visible: boolean;
};

export const TaskCompletedPanel: React.FC<Props> = ({ visible, completedTasks, onChange, reactivateTask }) => {
  if (isEmpty(completedTasks)) return null;

  return (
    <Container>
      <Title tabIndex={0} onClick={() => onChange(!visible)}>
        Completed ({completedTasks.length})
      </Title>
      {visible && <TasksCompletedList tasks={completedTasks} onReactivate={reactivateTask} />}
    </Container>
  );
};

const Container = styled('div', {
  bg: 'rgba(255,255,255,0.03)',
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
