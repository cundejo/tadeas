import React, { ReactElement } from 'react';
import { Container } from '@nextui-org/react';

interface ListItemProps extends React.ComponentProps<any> {
  extra: ReactElement;
}

export const ListItem: React.FC<ListItemProps> = ({ children, extra }) => {
  return (
    <Container
      display="flex"
      wrap="nowrap"
      alignItems="center"
      justify="space-between"
      css={{ padding: 0, borderBottom: '1px solid $accents2' }}
    >
      <div>{children}</div>
      {extra && <div>{extra}</div>}
    </Container>
  );
};

export const List: React.FC<React.ComponentProps<any>> = ({ children }) => {
  return <div>{children}</div>;
};
