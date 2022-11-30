import React from 'react';
import { Checkbox, styled } from '@nextui-org/react';
import { Task } from '@/features/task';

type Props = {
  task: Task;
};

export const TaskCompleted: React.FC<Props> = ({ task }) => {
  return (
    <Container>
      <div>
        <Checkbox aria-label="complete" isRounded size="xl" defaultSelected={true} />
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
  borderRadius: '$md',
  padding: '$sm',
  pb: '6px',
  gap: '$md',
  overflowX: 'hidden',

  '&:hover': {
    background: '$gray50',
  },

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
    opacity: '0.6',
  },
});
