import React from 'react';
import { Button as NextUiButton, ButtonProps, Loading } from '@nextui-org/react';

type Props = Partial<ButtonProps> & {
  loading?: boolean;
  noLoadingIcon?: boolean;
};

export const Button: React.FC<Props> = ({ loading, noLoadingIcon = false, children, ...rest }) => {
  return (
    <NextUiButton rounded disabled={loading} {...rest}>
      {loading && !noLoadingIcon ? <Loading color="white" size="sm" /> : children}
    </NextUiButton>
  );
};
