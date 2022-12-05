import React from 'react';
import { Button } from '@/common';
import { MdAddTask } from 'react-icons/md';

type Props = {
  onClick: () => void;
  loading: boolean;
};

export const AddTaskButton: React.FC<Props> = ({ onClick, loading }) => {
  return (
    <>
      <Button icon={<MdAddTask />} auto color="primary" rounded onClick={onClick} loading={loading} noLoadingIcon>
        Add Task
      </Button>
    </>
  );
};
