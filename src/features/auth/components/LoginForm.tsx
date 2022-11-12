import React, { useState } from 'react';
import { Input, Spacer, styled, Text } from '@nextui-org/react';
import { EmailFormValues, sendAuthLinkToUserEmail, validateForm } from '@/features/auth';
import { Button, InputError, Note } from '@/features/common';
import { FormikHelpers, FormikProps, useFormik } from 'formik';

type HookDto = {
  wasEmailSent: boolean;
  formik: FormikProps<EmailFormValues>;
};

const useLoginForm = (): HookDto => {
  const [wasEmailSent, setWasEmailSent] = useState(false);

  const handleSubmit = (values: EmailFormValues, { setSubmitting }: FormikHelpers<EmailFormValues>) => {
    sendAuthLinkToUserEmail(values.email).then(() => {
      setWasEmailSent(true);
      setSubmitting(false);
    });
  };

  const formik = useFormik({
    initialValues: { email: '' },
    validate: validateForm,
    onSubmit: handleSubmit,
  });

  return { wasEmailSent, formik };
};

export const LoginForm: React.FC = () => {
  const { wasEmailSent, formik } = useLoginForm();

  if (wasEmailSent)
    return (
      <Container>
        <Text h3>Check your inbox</Text>
        <Text>
          Check your email account <code>{formik.values.email}</code> and click in your Sign In link.
        </Text>
        <Note>
          Note: If you don&apos;t find the email in your inbox, please check in your <strong>spam</strong> folder.
        </Note>
      </Container>
    );

  return (
    <Container>
      <Text h3>To continue please sign in by entering your email</Text>

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
        <Button type="submit" auto color="primary" loading={formik.isSubmitting} css={{ w: '100%' }}>
          Sign in
        </Button>
      </form>

      <Note>Note: We need your email to associate the lists and tasks you will create with you, that is it!</Note>
    </Container>
  );
};

const Container = styled('div', {
  margin: '$lg 0',
});
