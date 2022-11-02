import React from 'react';
import { Signing } from '@/features/auth';
import { useRouter } from 'next/router';
import { NextPage } from 'next';

const SigningPage: NextPage = () => {
  const router = useRouter();

  if (!router.isReady) return null;

  return <Signing />;
};

export default SigningPage;
