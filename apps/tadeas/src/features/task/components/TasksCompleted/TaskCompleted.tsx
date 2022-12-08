import React from 'react';
import { Checkbox, styled } from '@nextui-org/react';
import { Task } from '@tadeas/types';
import { sleep } from '@/common';
import { TaskText } from '@/features/task/components/TasksActive';

type Props = {
  task: Task;
  onUnmark: (task: Task) => void;
};

export const TaskCompleted: React.FC<Props> = ({ task, onUnmark }) => {
  const handleCheckTask = (checked: boolean) => {
    sleep(200).then(() => {
      if (!checked) onUnmark(task);
    });
  };

  return (
    <Container>
      <div>
        <Checkbox aria-label="complete" isRounded size="xl" defaultSelected={true} onChange={handleCheckTask} />
      </div>
      <div>
        <TaskText task={task} lineThrough />
      </div>
    </Container>
  );
};

const Container = styled('div', {
  display: 'flex',
  margin: '0 auto',
  padding: '$sm',
  pb: '6px',
  gap: '$md',
  overflowX: 'hidden',
  opacity: '0.6',

  '& .content': {
    flexGrow: 1,
  },

  '& .nextui-icon-check': {
    mt: '-4px',
  },
});
