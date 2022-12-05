import React from 'react';
import { Modal as NextUiModal, ModalProps, Text } from '@nextui-org/react';

type Props = Partial<ModalProps> & {
  title: string;
  visible: boolean;
};

export const Modal: React.FC<Props> = ({ title, visible, children, ...rest }) => {
  return (
    <NextUiModal closeButton blur aria-labelledby={title} open={visible} preventClose {...rest}>
      <NextUiModal.Header>
        <Text h4 id="title">
          {title}
        </Text>
      </NextUiModal.Header>
      <NextUiModal.Body css={{ marginBottom: '2rem' }}>{children}</NextUiModal.Body>
    </NextUiModal>
  );
};
