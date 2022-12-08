import React from 'react';
import { useFormik } from 'formik';
import { Input, Spacer } from '@nextui-org/react';
import { Button, Modal } from '@/common';
import { useLists } from '@/features/list';

interface Props {
  onClose: () => void;
}

export const ListEditModal: React.FC<Props> = ({ onClose }) => {
  const { listSelected: list, renameList } = useLists();

  if (!list) throw new Error(`List not found.`);

  const formik = useFormik({
    initialValues: { name: list.name },
    onSubmit: (values, { setSubmitting }) => {
      renameList(list.id, values.name).then(() => {
        setSubmitting(false);
        formik.resetForm();
        onClose();
      });
    },
  });

  return (
    <Modal title="Edit List" onClose={onClose} visible>
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
            Save
          </Button>
        </form>
      </>
    </Modal>
  );
};
