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
      <div className="check">
        <Checkbox aria-label="complete" size="lg" onChange={handleCompletedTask} />
      </div>
      <div className="content">
        <Title task={task} inEdition={inEdition} handleChange={handleChange} onClick={onClick} />
      </div>
    </Container>
  );
};

type TitleProps = {
  task: Task;
  inEdition: boolean;
  handleChange: (field: 'title' | 'details', value: string) => void;
  onClick: (taskId: string) => void;
};

const Title: React.FC<TitleProps> = ({ task, inEdition, handleChange, onClick }) => {
  const handleKeyDown = (e: { key: string }) => {
    if (e.key === 'Enter') onClick(task.id);
  };

  return (
    <TitleContainer>
      {inEdition ? (
        <Input
          size="xs"
          aria-label="title"
          placeholder="Add task title"
          value={task.title}
          fullWidth
          animated={false}
          onChange={(e) => handleChange('title', e.target.value)}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <h4>{task.title}</h4>
      )}
    </TitleContainer>
  );
};

const TitleContainer = styled('div', {
  fontSize: '$md',

  '& input': {
    // border: '1px solid red',
    fontSize: '$md',
    fontWeight: 'normal',
    margin: '0 !important',
  },
  '& h4': {
    // border: '1px solid red',
    fontSize: '$md',
    fontWeight: 'normal',
    letterSpacing: 'normal',
    margin: 0,
  },
});

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

  '& .check': {
    paddingTop: '2px',
  },

  '& .content': {
    flexGrow: 1,
  },
});
