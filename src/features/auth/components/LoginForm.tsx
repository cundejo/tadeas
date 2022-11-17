import React, { useState } from 'react';
import { Input, Spacer, styled, Text } from '@nextui-org/react';
import { EmailFormValues, sendAuthLinkToUserEmail, validateForm } from '@/features/auth';
import { Button, Description, InputError, Note } from '@/features/common';
import { FormikHelpers, FormikProps, useFormik } from 'formik';
import { MdOutlineMarkEmailRead } from 'react-icons/md';

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

/**
 *

 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

 curl --request POST \
 --url https://api.sendinblue.com/v3/smtp/email \
 --header 'accept: application/json' \
 --header 'api-key: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' \
 --header 'content-type: application/json' \
 --data '{
   "sender":{
      "name":"Tadeas App",
      "email":"noreply@tadeas.app"
   },
   "to":[
      {
         "email":"cundejo85@gmail.com",
      }
   ],
   "subject":"Tadeas sign in code",
   "htmlContent":"<html><head></head><body><p>Hello,</p>This is your code for Tadeas App: 1234.</p></body></html>"
}'


 */
