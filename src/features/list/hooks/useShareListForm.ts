import { FormikHelpers, FormikProps, useFormik } from 'formik';
import { List } from '@/features/list';
import { useAuth } from '@/features/auth';
import { User } from 'firebase/auth';

type Values = {
  email: string;
};

type Errors = {
  email?: string;
};

type HookDto = {
  formik: FormikProps<Values>;
};

export const useShareListForm = (list: List, saveList: (list: List) => Promise<void>): HookDto => {
  const { user } = useAuth();

  const handleSubmit = (values: Values, { setSubmitting }: FormikHelpers<Values>) => {
    const newList = { ...list };
    newList.sharedWith = [...newList.sharedWith, values.email];
    saveList(newList).then(() => {
      formik.resetForm();
      setSubmitting(false);
    });
  };

  const formik = useFormik({
    initialValues: { email: '' },
    validate: (values) => validateForm(values, user!),
    onSubmit: handleSubmit,
  });

  return { formik };
};

const validateForm = (values: Values, user: User) => {
  const errors: Errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (values.email === user.email) errors.email = 'Sharing with yourself huh? You should get a friend for this.';
  return errors;
};
