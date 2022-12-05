import React from 'react';
import { Text, TextProps } from '@nextui-org/react';

export const Note: React.FC<TextProps> = ({ children, ...rest }) => {
  return (
    <Text {...rest} blockquote css={{ mb: '$lg', fs: '$sm', color: '$accents8' }}>
      {children}
    </Text>
  );
};
