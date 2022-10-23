import React from 'react';
import { Task, TaskComponent } from '@/features/task';
import { styled } from '@nextui-org/react';

type Props = {
  tasks: Task[];
  taskInEdition: Task | undefined;
  switchTaskSelected: (taskId: string) => void;
  onChangeTask: (task: Task) => void;
  onComplete: (task: Task) => void;
};

export const TasksList: React.FC<Props> = ({ tasks, taskInEdition, switchTaskSelected, onChangeTask, onComplete }) => {
  return (
    <Container>
      {tasks.map((task) => (
        <TaskComponent
          key={task.id}
          task={task.id === taskInEdition?.id ? taskInEdition : task}
          inEdition={task.id === taskInEdition?.id}
          onClick={switchTaskSelected}
          onChange={onChangeTask}
          onComplete={onComplete}
        />
      ))}
    </Container>
  );
};

const Container = styled('div', {
  marginTop: '$md',
});
