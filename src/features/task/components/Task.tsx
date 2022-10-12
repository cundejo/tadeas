import React from 'react';
import { Checkbox, Input, styled } from '@nextui-org/react';
import { Task } from '@/features/task';

type Props = {
  task: Task;
  inEdition: boolean;
  onClick: (taskId: string) => void;
  onChange: (task: Task) => void;
};

export const TaskComponent: React.FC<Props> = ({ task, inEdition, onClick, onChange }) => {
  const handleCompletedTask = (checked: boolean) => {
    console.log('completed', checked);
  };

  const handleChange = (field: 'title' | 'details', value: string) => {
    if (field === 'title') onChange({ ...task, title: value });
    else onChange({ ...task, details: value });
  };

  return (
    <Container selected={inEdition} onClick={() => onClick(task.id)}>
      <div>
        <Checkbox aria-label="complete" size="lg" onChange={handleCompletedTask} />
      </div>
      <div>
        {inEdition ? (
          <Input
            aria-label="title"
            placeholder="Next UI"
            value={task.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        ) : (
          <h4>{task.title}</h4>
        )}
        <p>{task?.details}</p>
      </div>
    </Container>
  );
};

const Container = styled('div', {
  display: 'flex',
  margin: '0 auto',
  borderRadius: '$md',
  padding: '$md',
  gap: '$md',
  variants: {
    selected: {
      true: {
        background: '$gray50',
      },
    },
  },
  '&:hover': {
    background: '$gray50',
  },

  '& h4': { marginBottom: 0, lineHeight: '1.2em' },
  '& p': { margin: 0, color: '$gray800' },
});
