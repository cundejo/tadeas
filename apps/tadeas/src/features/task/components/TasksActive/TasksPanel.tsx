import React from 'react';
import { Task } from '@/features/task';
import { styled } from '@nextui-org/react';
import { AddTaskButton } from './AddTaskButton';
import { TasksList } from './TasksList';

type Props = {
  addTask: () => void;
  completeTask: (task: Task) => void;
  isCompletedTasksVisible: boolean;
  isSaving: boolean;
  setTaskInEdition: (task?: Task) => void;
  switchSelectedTask: (taskId: string) => void;
  taskInEdition?: Task;
  tasks: Task[];
};

export const TasksPanel: React.FC<Props> = ({
  isCompletedTasksVisible,
  tasks,
  addTask,
  isSaving,
  taskInEdition,
  switchSelectedTask,
  setTaskInEdition,
  completeTask,
}) => {
  return (
    <Container collapsed={isCompletedTasksVisible}>
      <AddTaskButton onClick={addTask} loading={isSaving} />
      <TasksList
        tasks={tasks}
        taskInEdition={taskInEdition}
        switchTaskSelected={switchSelectedTask}
        onChangeTask={setTaskInEdition}
        onComplete={completeTask}
      />
    </Container>
  );
};

const Container = styled('div', {
  padding: '0 $md',
  height: 'calc(100% - 50px)',
  overflowY: 'auto',

  variants: {
    collapsed: {
      true: {
        height: 'calc(100% - 50px - 30vh)',
      },
    },
  },
});
