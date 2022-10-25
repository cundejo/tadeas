import React, { useEffect, useState } from 'react';
import { Card, Row, styled } from '@nextui-org/react';
import { Task } from '@/features/task';
import { Button } from '@/features/common';

type Props = {
  tasksCompletedRecently?: Task;
  onUndo: (task?: Task) => void;
};

export const CompletedNotification: React.FC<Props> = ({ tasksCompletedRecently, onUndo }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (tasksCompletedRecently) {
      setIsVisible(true);
      const id = setTimeout(() => setIsVisible(false), 4000);
      return () => clearInterval(id);
    } else {
      setIsVisible(false);
    }
  }, [tasksCompletedRecently]);

  if (!isVisible) return null;

  return (
    <Container>
      <Card>
        <Card.Body className="cardbody">
          <Row align="center" className="row">
            <p>Task completed</p>
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

  '& .cardbody': {
    pt: '$xs',
    pb: '$xs',
    color: '$gray800',
  },
  '& .row': {
    justifyContent: 'space-between',
  },
  '& p': {
    margin: 0,
  },
});
