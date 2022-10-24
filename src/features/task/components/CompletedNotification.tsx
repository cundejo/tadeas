import React from 'react';
import { Card, Row, styled } from '@nextui-org/react';
import { Task } from '@/features/task';
import { Button } from '@/features/common';

type Props = {
  tasksCompletedRecently?: Task;
  onUndo: (task: Task) => void;
};

export const CompletedNotification: React.FC<Props> = ({ tasksCompletedRecently, onUndo }) => {
  if (!tasksCompletedRecently) return null;

  return (
    <Container>
      <Card>
        <Card.Body>
          <Row align="center" css={{ justifyContent: 'space-between' }}>
            <h4 style={{ margin: 0 }}>Task completed</h4>
            <Button auto flat onClick={() => onUndo(tasksCompletedRecently)}>
              Undo
            </Button>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

const Container = styled('div', {
  bottom: '$md',
  display: 'flex',
  left: '$md',
  margin: '0 auto',
  maxWidth: '650px',
  position: 'fixed',
  right: '$md',
});
