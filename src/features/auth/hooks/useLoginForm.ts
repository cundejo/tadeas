import { sendAuthLinkToUserEmail } from '../api';
import { useState } from 'react';
import { FormikHelpers, FormikProps, useFormik } from 'formik';

type Values = {
  email: string;
};

type Errors = {
  email?: string;
};

type HookDto = {
  wasEmailSent: boolean;
  formik: FormikProps<Values>;
};

export const useLoginForm = (): HookDto => {
  const [wasEmailSent, setWasEmailSent] = useState(false);

  const handleSubmit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
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

const validateForm = (values: Values) => {
  const errors: Errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};
