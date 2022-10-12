import React from 'react';
import { Button } from '@/features/common';

type Props = {
  onClick: () => void;
  loading: boolean;
};

export const AddTaskButton: React.FC<Props> = ({ onClick, loading }) => {
  return (
    <>
      <Button auto color="primary" rounded onClick={onClick} loading={loading}>
        ADD TASK
      </Button>
    </>
  );
};
