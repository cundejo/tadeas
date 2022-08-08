import React from 'react';
import { Button as NextUiButton, ButtonProps, Loading } from '@nextui-org/react';

type Props = Partial<ButtonProps> & {
  loading?: boolean;
};

export const Button: React.FC<Props> = ({ loading, children, ...rest }) => {
  return (
    <NextUiButton rounded disabled={loading} {...rest}>
      {loading ? <Loading color="white" size="sm" /> : children}
    </NextUiButton>
  );
};
