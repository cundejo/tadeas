import React from 'react';
import { Signout } from '@/features/auth';
import { useRouter } from 'next/router';

const SignoutPage: React.FC = () => {
  const router = useRouter();

  if (!router.isReady) return null;

  return <Signout />;
};

export default SignoutPage;
