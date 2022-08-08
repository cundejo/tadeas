import React from 'react';
import { Task, TaskComponent } from '@/features/task';

type Props = {
  tasks: Task[];
};

export const TasksList: React.FC<Props> = ({ tasks }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskComponent key={task.id} task={task} />
      ))}
    </div>
  );
};
