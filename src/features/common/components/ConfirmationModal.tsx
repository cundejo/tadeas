import React, { ReactNode } from 'react';
import { Container, ModalProps, Row, Text } from '@nextui-org/react';
import { Button, Modal } from '@/features/common';

type Props = Partial<ModalProps> & {
  visible: boolean;
  message?: string | ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
};

export const ConfirmationModal: React.FC<Props> = ({ visible, message, onCancel, onConfirm, ...rest }) => {
  return (
    <Modal title="Confirm" visible={visible} closeButton={false} onClose={onCancel} {...rest}>
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
          Yes
        </Button>
      </Container>
    </Modal>
  );
};
