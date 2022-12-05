import { CodeFormErrors, CodeFormValues, EmailFormErrors, EmailFormValues } from '@/features/auth';

export const validateEmailForm = (values: EmailFormValues) => {
  const errors: EmailFormErrors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

export const validateCodeForm = (values: CodeFormValues) => {
  const errors: CodeFormErrors = {};
  if (!values.code) {
    errors.code = 'Required';
  } else if (!/^[0-9]{6}$/i.test(values.code.toString())) {
    errors.code = 'The code is a six-digit number';
  }
  return errors;
};
