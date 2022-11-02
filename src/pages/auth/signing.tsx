import React from 'react';
import { Signing } from '@/features/auth';
import { useRouter } from 'next/router';

const SigningPage: React.FC = () => {
  const router = useRouter();

  if (!router.isReady) return null;

  return <Signing />;
};

export default SigningPage;
