import React from 'react';
import { Text } from '@nextui-org/react';

type Props = {
  touched: any;
  error: any;
};

export const InputError: React.FC<Props> = ({ touched, error }) => {
  if (!touched || !error) return null;
  return <Text css={{ ml: '1.2em', color: '$error', fs: '$sm' }}>{error}</Text>;
};
