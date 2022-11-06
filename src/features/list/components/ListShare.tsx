import React from 'react';
import { Text } from '@nextui-org/react';
import { useLists } from '@/features/list';

export const ListShare: React.FC = () => {
  const { listSelected } = useLists();

  return (
    <>
      <Text>Working on it...</Text>
    </>
  );
};
