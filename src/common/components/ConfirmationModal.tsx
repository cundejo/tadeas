import React, { ReactNode } from 'react';
import { Container, ModalProps, Row, Text } from '@nextui-org/react';
import { Button, Modal } from '@/common';

type Props = Partial<ModalProps> & {
  confirmButtonText?: string;
  message?: string | ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  visible: boolean;
};

export const ConfirmationModal: React.FC<Props> = ({
  confirmButtonText,
  message,
  onCancel,
  onConfirm,
  title,
  visible,
  ...rest
}) => {
  return (
    <Modal title={title ?? 'Confirm'} visible={visible} closeButton={false} onClose={onCancel} {...rest}>
      <Container display="flex" alignItems="center" justify="space-evenly">
        {message && (
          <Row justify="center" css={{ mb: '$lg' }}>
            <Text>{message}</Text>
          </Row>
        )}
        <Button auto onClick={onCancel}>
          Cancel
        </Button>
        <Button auto color="error" onClick={onConfirm}>
          {confirmButtonText ?? 'Yes'}
        </Button>
      </Container>
    </Modal>
  );
};
