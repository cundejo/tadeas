import React from 'react';
import { Button } from '@/features/common';

type Props = {
  onClick: () => void;
};

export const AddTaskButton: React.FC<Props> = ({ onClick }) => {
  return (
    <>
      <Button auto color="secondary" rounded flat onClick={onClick}>
        Add task
      </Button>
    </>
  );
};
