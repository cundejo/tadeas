import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Input, Spacer, Text } from '@nextui-org/react';
import { sendAuthLinkToUserEmail } from '@/features/auth';
import { Button, Modal } from '@/features/common';

interface ErrorProps {
  touched: any;
  error: any;
}

const Error: React.FC<ErrorProps> = ({ touched, error }) => {
  if (!touched || !error) return null;
  return <Text css={{ margin: '0  0 1em 1em', color: '$error' }}>{error}</Text>;
};

interface Props {
  message?: string;
  visible: boolean;
  onClose: () => void;
}

export const ModalAuthRequired: React.FC<Props> = ({ message, visible, onClose }) => {
  const [emailAccount, setEmailAccount] = useState('');
  const formik = useFormik({
    initialValues: { email: '' },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        // @ts-ignore
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        // @ts-ignore
        errors.email = 'Invalid email address';
      }
      return errors;
    },
    onSubmit: (values, { setSubmitting }) => {
      sendAuthLinkToUserEmail(values.email).then(() => {
        setEmailAccount(values.email);
        setSubmitting(false);
      });
    },
  });

  return (
    <Modal title="Join" onClose={onClose} visible={visible}>
      {emailAccount ? (
        <>
          <Text>
            Check your inbox <code>{emailAccount}</code> and click in your Sign In link. If you don&apos;t find the
            email in your inbox, please check in your <strong>spam</strong> folder.
          </Text>
        </>
      ) : (
        <>
          <Text>{message ?? 'To continue please signup by entering your email!'}</Text>

          <form onSubmit={formik.handleSubmit}>
            <Input
              type="email"
              name="email"
              labelPlaceholder="Your email"
              bordered
              rounded
              required
              autoComplete="on"
              value={formik.values.email}
              onChange={formik.handleChange}
              fullWidth
            />
            <Error error={formik.errors.email} touched={formik.touched.email} />
            <Spacer />
            <Button type="submit" auto color="primary" loading={formik.isSubmitting} css={{ w: '100%' }}>
              Sign in
            </Button>
          </form>
        </>
      )}
    </Modal>
  );
};
