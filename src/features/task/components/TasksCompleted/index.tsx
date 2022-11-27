import React from 'react';
import { Collapse, styled, Text } from '@nextui-org/react';
import { Task } from '@/features/task';

type Props = {
  completedTasks: Task[];
};

export const TasksCompleted: React.FC<Props> = ({ completedTasks }) => {
  return (
    <Container>
      <Collapse.Group accordion={false}>
        <Collapse title="Option A">
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </Text>
        </Collapse>
      </Collapse.Group>
    </Container>
  );
};

const Container = styled('div', {
  bg: 'red',
  display: 'block',
  position: 'sticky',
  bottom: 0,
});
