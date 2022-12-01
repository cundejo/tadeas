import React, { useState } from 'react';
import { Checkbox, Input, styled } from '@nextui-org/react';
import { Task } from '@/features/task';
import { sleep } from '@/common';

type Props = {
  task: Task;
  inEdition: boolean;
  onClick: (taskId: string) => void;
  onChange: (task: Task) => void;
  onComplete: (task: Task) => void;
};

export const TaskComponent: React.FC<Props> = ({ task, inEdition, onClick, onChange, onComplete }) => {
  const [markAsCompleted, setMarkAsCompleted] = useState(false);

  const handleCheckTask = (checked: boolean) => {
    if (checked) setMarkAsCompleted(true);
    // Wait some millis to represent the deletion UI effect before call complete
    sleep(500).then(() => {
      if (checked) onComplete(task);
    });
  };

  const handleChange = (title: string) => {
    onChange({ ...task, title });
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === 'Enter') onClick(task.id);
  };

  return (
    <Container selected={inEdition} onClick={() => onClick(task.id)}>
      <div className="check">
        <Checkbox aria-label="complete" isRounded size="xl" onChange={handleCheckTask} />
      </div>
      <div className="content">
        <TitleContainer>
          {inEdition ? (
            <Input
              size="xs"
              aria-label="title"
              placeholder="Add task title"
              value={task.title}
              fullWidth
              animated={false}
              onChange={(e) => handleChange(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <h4 style={{ textDecorationLine: markAsCompleted ? 'line-through' : 'none' }}>{task.title}</h4>
          )}
        </TitleContainer>
      </div>
    </Container>
  );
};

const Container = styled('div', {
  display: 'flex',
  margin: '0 auto',
  borderRadius: '$xl',
  padding: '$sm',
  pb: '6px',
  gap: '$md',
  overflowX: 'hidden',
  variants: {
    selected: {
      true: {
        bg: 'rgba(255,255,255,0.03)',
      },
    },
  },
  '&:hover': {
    bg: 'rgba(255,255,255,0.03)',
  },

  '& .content': {
    flexGrow: 1,
  },
});

const TitleContainer = styled('div', {
  '& label': {
    bg: 'transparent',
  },
  '& input': {
    fontSize: '$lg',
    fontWeight: 'normal',
    margin: '2px 0 0 !important',
  },
  '& h4': {
    fontSize: '$lg',
    fontWeight: 'normal',
    letterSpacing: 'normal',
    margin: 0,
  },
});
