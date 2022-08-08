import React from 'react';
import { Task } from '@/features/task';

type Props = {
  task: Task;
};

export const TaskComponent: React.FC<Props> = ({ task }) => {
  return (
    <>
      <div>{task.title}div</div>
      <div>{task.description}</div>
    </>
  );
};
