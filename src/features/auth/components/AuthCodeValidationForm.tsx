import React from 'react';
import { Input, Spacer, styled } from '@nextui-org/react';
import { CodeFormValues, useAuth, validateCodeForm } from '@/features/auth';
import { Button, Description, InputError, Note, TextColorful } from '@/common';
import { FormikHelpers, FormikProps, useFormik } from 'formik';
import { MdOutlineCheckCircleOutline } from 'react-icons/md';

type HookDto = {
  emailForSigning?: string;
  formik: FormikProps<CodeFormValues>;
};

const useAuthCodeValidationForm = (): HookDto => {
  const { emailForSigning, validateAuthCode } = useAuth();

  const handleSubmit = (values: CodeFormValues, { setSubmitting }: FormikHelpers<CodeFormValues>) => {
    validateAuthCode(values.code, setSubmitting);
  };

  const formik = useFormik({
    initialValues: { code: '' },
    validate: validateCodeForm,
    onSubmit: handleSubmit,
  });

  return { formik, emailForSigning };
};

export const AuthCodeValidationForm: React.FC = () => {
  const { formik, emailForSigning } = useAuthCodeValidationForm();

  return (
    <Container>
      <Description
        subTitle={
          <>
            Check your email account <TextColorful yellow>{emailForSigning}</TextColorful> and paste here the code we
            sent you.
          </>
        }
      >
        Check your inbox
      </Description>

      <form onSubmit={formik.handleSubmit}>
        <Input
          aria-label="code"
          fullWidth
          name="code"
          onChange={formik.handleChange}
          placeholder="enter code"
          required
          rounded
          type="text"
          value={formik.values.code}
        />
        <InputError error={formik.errors.code} touched={formik.touched.code} />
        <Spacer />
        <Button
          icon={<MdOutlineCheckCircleOutline />}
          type="submit"
          auto
          color="primary"
          loading={formik.isSubmitting}
          css={{ w: '100%' }}
          disabled={formik.isSubmitting || !!formik.errors.code}
        >
          Validate
        </Button>
      </form>

      <Note>
        Note: If you can&apos;t find the email in your inbox, please check in your <strong>spam</strong> folder.
      </Note>
    </Container>
  );
};

const Container = styled('div', {
  margin: '$lg',

  '& input': {
    textAlign: 'center',
    fs: '$xl',
  },

  '& .description p': {
    lineHeight: '1.3em',
  },
});
