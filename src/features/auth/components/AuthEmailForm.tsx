import React from 'react';
import { Input, Spacer, styled } from '@nextui-org/react';
import { EmailFormValues, useAuth, validateEmailForm } from '@/features/auth';
import { Button, Description, InputError, Note } from '@/common';
import { FormikHelpers, FormikProps, useFormik } from 'formik';
import { MdOutlineMarkEmailRead } from 'react-icons/md';

type HookDto = {
  formik: FormikProps<EmailFormValues>;
};

const useAuthEmailForm = (): HookDto => {
  const { generateAuthCode } = useAuth();

  const handleSubmit = (values: EmailFormValues, { setSubmitting }: FormikHelpers<EmailFormValues>) => {
    generateAuthCode(values.email, setSubmitting);
  };

  const formik = useFormik({
    initialValues: { email: '' },
    validate: validateEmailForm,
    onSubmit: handleSubmit,
  });

  return { formik };
};

export const AuthEmailForm: React.FC = () => {
  const { formik } = useAuthEmailForm();

  return (
    <Container>
      <Description>Sign in by entering your email</Description>

      <form onSubmit={formik.handleSubmit}>
        <Input
          aria-label="email"
          type="email"
          name="email"
          placeholder="Your email"
          bordered
          rounded
          required
          autoComplete="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          fullWidth
        />
        <InputError error={formik.errors.email} touched={formik.touched.email} />
        <Spacer />
        <Button
          icon={<MdOutlineMarkEmailRead />}
          type="submit"
          auto
          color="primary"
          loading={formik.isSubmitting}
          css={{ w: '100%' }}
        >
          Get Code
        </Button>
      </form>

      <Note>Note: We need your email to associate the lists and tasks you will create with you, that is it!</Note>
    </Container>
  );
};

const Container = styled('div', {
  margin: '$lg 0',
});
