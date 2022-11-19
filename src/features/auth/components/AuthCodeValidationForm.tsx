import React from 'react';
import { Input, Popover, Spacer, styled, Text } from '@nextui-org/react';
import { CodeFormValues, validateCodeForm } from '@/features/auth';
import { Button, Description, InputError, Note } from '@/features/common';
import { FormikHelpers, FormikProps, useFormik } from 'formik';
import { MdOutlineCheckCircleOutline } from 'react-icons/md';

type HookDto = {
  formik: FormikProps<CodeFormValues>;
};

const useAuthCodeValidationForm = (): HookDto => {
  const handleSubmit = (values: CodeFormValues, { setSubmitting }: FormikHelpers<CodeFormValues>) => {
    // sendAuthLinkToUserEmail(values.email).then(() => {
    //   setSubmitting(false);
    // });
    console.log('values', values);
  };

  const formik = useFormik({
    initialValues: { code: '' },
    validate: validateCodeForm,
    onSubmit: handleSubmit,
  });

  return { formik };
};

export const AuthCodeValidationForm: React.FC = () => {
  const { formik } = useAuthCodeValidationForm();

  return (
    <Container>
      <Description subTitle="Check your email account and paste here the code we sent you.">
        Check your inbox
      </Description>

      <form onSubmit={formik.handleSubmit}>
        <Input
          aria-label="code"
          type="number"
          name="code"
          bordered
          rounded
          required
          value={formik.values.code}
          onChange={formik.handleChange}
          fullWidth
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
          disabled={!!formik.errors.code}
        >
          Validate
        </Button>
      </form>

      <Note>
        Note: If you don&apos;t find the email in your inbox, please check in your <strong>spam</strong> folder.
      </Note>
    </Container>
  );
};

const Container = styled('div', {
  margin: '$lg 0',

  '& input': {
    textAlign: 'center',
    fs: '$xl',
  },

  '& .description p': {
    lineHeight: '1.3em',
  },
});
