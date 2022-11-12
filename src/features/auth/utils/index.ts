import { EmailFormErrors, EmailFormValues } from '@/features/auth';

export const validateForm = (values: EmailFormValues) => {
  const errors: EmailFormErrors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};
