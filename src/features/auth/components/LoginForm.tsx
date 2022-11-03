import React from 'react';
import { Input, Spacer, Text } from '@nextui-org/react';
import { useLoginForm } from '@/features/auth';
import { Button } from '@/features/common';

interface ErrorProps {
  touched: any;
  error: any;
}

export const LoginForm: React.FC = () => {
  const { wasEmailSent, formik } = useLoginForm();

  if (wasEmailSent)
    return (
      <>
        <Text h3>Check your inbox</Text>
        <Text>
          Check your email account <code>{formik.values.email}</code> and click in your Sign In link. If you don&apos;t
          find the email in your inbox, please check in your <strong>spam</strong> folder.
        </Text>
      </>
    );

  return (
    <>
      <Text h3>To continue please sign in by entering your email</Text>

      <Text css={{ mb: '$lg' }}>
        We need your email account to associate the lists and tasks you will create with you, that is it!
      </Text>

      <form onSubmit={formik.handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="Your email"
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
  );
};

const Error: React.FC<ErrorProps> = ({ touched, error }) => {
  if (!touched || !error) return null;
  return <Text css={{ margin: '0  0 1em 1em', color: '$error' }}>{error}</Text>;
};
