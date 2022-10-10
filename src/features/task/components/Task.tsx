import React from 'react';
import { Checkbox, styled } from '@nextui-org/react';
import { Task } from '@/features/task';

type Props = {
  task: Task;
};

export const TaskComponent: React.FC<Props> = ({ task }) => {
  const handleCompletedTask = (isSelected: boolean) => {
    console.log('completed', isSelected);
  };

  return (
    <Container>
      <div>
        <Checkbox size="lg" onChange={handleCompletedTask} />
      </div>
      <div>
        <h4>{task.title}</h4>
        <p>{task?.details}</p>
      </div>
    </Container>
  );
};

const Container = styled('div', {
  display: 'flex',
  // alignItems: 'center',
  margin: '$md auto',
  gap: '$md',

  '& h4': { marginBottom: 0, lineHeight: '1.2em' },
  '& p': { margin: 0, color: '$gray800' },
});
