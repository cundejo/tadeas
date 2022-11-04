import React from 'react';
import { useFormik } from 'formik';
import { Input, Spacer } from '@nextui-org/react';
import { Button, Modal } from '@/features/common';
import { useLists } from '@/features/list';

interface Props {
  onClose: () => void;
}

export const ListAddModal: React.FC<Props> = ({ onClose }) => {
  const { addList } = useLists();

  const formik = useFormik({
    initialValues: { name: '' },
    onSubmit: (values, { setSubmitting }) => {
      addList(values.name).then(() => {
        setSubmitting(false);
        formik.resetForm();
        onClose();
      });
    },
  });

  return (
    <Modal title="New List" onClose={onClose} visible>
      <>
        <form onSubmit={formik.handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="List name"
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
