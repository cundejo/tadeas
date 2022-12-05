import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { getLocalStorage, LOCAL_STORAGE_EMAIL_FOR_SIGNING, RootState, useDispatch } from '@/common';
import {
  removeEmailForSigning,
  setEmailForSigning,
  signIn,
  generateAuthCode as generateAuthCodeApi,
  signOff,
  validateAuthCode as validateAuthCodeApi,
} from '@/features/auth';

type HookDto = {
  emailForSigning?: string;
  signOut: () => Promise<void>;
  generateAuthCode: (email: string, setSubmitting: (submitting: boolean) => void) => Promise<void>;
  validateAuthCode: (authCode: string, setSubmitting: (submitting: boolean) => void) => Promise<void>;
};

export const useAuth = (): HookDto => {
  const dispatch = useDispatch();
  const router = useRouter();
  const emailForSigning =
    useSelector((state: RootState) => state.auth.emailForSigning) ??
    getLocalStorage(LOCAL_STORAGE_EMAIL_FOR_SIGNING) ??
    undefined;

  const generateAuthCode = async (email: string, setSubmitting: (submitting: boolean) => void) => {
    const { code } = await generateAuthCodeApi(email);
    setSubmitting(false);
    if (code === 'AUTH_CODE_GENERATED') {
      dispatch(setEmailForSigning(email));
      router.push('/auth/code-validation');
    } else {
      router.push('/');
      toast.error('There was an error signing you in. Please try again.');
    }
  };

  const validateAuthCode = async (authCode: string, setSubmitting: (submitting: boolean) => void) => {
    const redirectWithError = () => {
      router.push('/');
      toast.error('There was an error signing you in. Please try again.', { autoClose: 5000, hideProgressBar: false });
    };

    if (!emailForSigning) return redirectWithError();

    const { code, data } = await validateAuthCodeApi(emailForSigning, authCode);

    if (code === 'AUTH_VALIDATION_SUCCESSFUL') {
      await signIn(data);
      dispatch(removeEmailForSigning());
      router.push('/');
    } else if (code === 'AUTH_VALIDATION_FAILED') {
      toast.error(data, { autoClose: 5000, hideProgressBar: false });
    } else {
      dispatch(removeEmailForSigning());
      redirectWithError();
    }

    setSubmitting(false);
  };

  const signOut = async () => {
    await signOff();
  };

  return { emailForSigning, generateAuthCode, validateAuthCode, signOut };
};
