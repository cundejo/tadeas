import React, { useEffect, useState } from 'react';
import { EmailFormValues, signIn, validateForm } from '@/features/auth';
import { useRouter } from 'next/router';
import { Button, getLocalStorage, InputError, LOCAL_STORAGE_EMAIL_FOR_SIGNING, PageLoading } from '@/features/common';
import { Input, Spacer, styled, Text } from '@nextui-org/react';
import { FormikProps, useFormik } from 'formik';

type HookDto = {
  isSigning: boolean;
  formik: FormikProps<EmailFormValues>;
};

const useConfirmEmailFormLoginForm = (): HookDto => {
  const router = useRouter();
  const [isSigning, setIsSigning] = useState(false);

  // If the email for signing is in the local storage, signing with that.
  useEffect(() => {
    const email = getLocalStorage(LOCAL_STORAGE_EMAIL_FOR_SIGNING);
    if (!email) return;
    setIsSigning(true);
    (async () => {
      const redirectTo = await signIn(email);
      router.push(redirectTo);
    })();
  }, []);

  const formik = useFormik({
    initialValues: { email: '' },
    validate: validateForm,
    onSubmit: (values: EmailFormValues) => {
      signIn(values.email).then((redirectTo) => {
        router.push(redirectTo);
      });
    },
  });

  return { formik, isSigning };
};

export const Signing: React.FC = () => {
  const { formik, isSigning } = useConfirmEmailFormLoginForm();

  if (isSigning) return <PageLoading />;

  return (
    <Container>
      <Text h3>Confirm your email</Text>

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
    </Container>
  );
};

const Container = styled('div', {
  margin: '$lg 0',
});
