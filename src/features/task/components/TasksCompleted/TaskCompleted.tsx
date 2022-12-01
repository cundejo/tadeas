import React from 'react';
import { Checkbox, styled } from '@nextui-org/react';
import { Task } from '@/features/task';
import { sleep } from '@/common';

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
        <TitleContainer>
          <h4 style={{ textDecorationLine: 'line-through' }}>{task.title}</h4>
        </TitleContainer>
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

const TitleContainer = styled('div', {
  '& h4': {
    fontSize: '$lg',
    fontWeight: 'normal',
    letterSpacing: 'normal',
    margin: 0,
  },
});
