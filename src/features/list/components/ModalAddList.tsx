import React from 'react';
import { useFormik } from 'formik';
import { Input, Spacer, Text } from '@nextui-org/react';
import { Button, Modal } from '@/features/common';

interface Props {
  onAdd: (name: string) => Promise<void>;
  onClose: () => void;
  visible: boolean;
}

export const ModalAddList: React.FC<Props> = ({ visible, onClose, onAdd }) => {
  const formik = useFormik({
    initialValues: { name: '' },
    onSubmit: (values, { setSubmitting }) => {
      onAdd(values.name).then((r) => {
        setSubmitting(false);
        onClose();
        formik.resetForm();
      });
    },
  });

  return (
    <Modal title="New List" onClose={onClose} visible={visible}>
      <>
        <form onSubmit={formik.handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="New list name"
            bordered
            rounded
            required
            value={formik.values.name}
            onChange={formik.handleChange}
            fullWidth
          />
          <Spacer />
          <Button type="submit" auto color="primary" loading={formik.isSubmitting} css={{ w: '100%' }}>
            Add
          </Button>
        </form>
      </>
    </Modal>
  );
};
