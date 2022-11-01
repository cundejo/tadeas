import React from 'react';
import { useFormik } from 'formik';
import { Input, Spacer, Text } from '@nextui-org/react';
import { Button, Modal } from '@/features/common';
import { List } from '@/features/list';

interface Props {
  list?: List;
  onChange: (list: List) => Promise<void>;
  onClose: () => void;
  visible: boolean;
}

export const ListEditModal: React.FC<Props> = ({ list, visible, onClose, onChange }) => {
  const formik = useFormik({
    initialValues: { name: list ? list.name : '' },
    onSubmit: (values, { setSubmitting }) => {
      const newList = {
        ...(list || {}),
        name: values.name,
      } as List;
      onChange(newList).then((r) => {
        setSubmitting(false);
        formik.setFieldValue('name', values.name);
        onClose();
      });
    },
  });

  return (
    <Modal title={list ? 'Edit List' : 'New List'} onClose={onClose} visible={visible}>
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
            {list ? 'Save' : 'Add'}
          </Button>
        </form>
      </>
    </Modal>
  );
};
