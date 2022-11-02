import React from 'react';
import { NextPage } from 'next';
import { Signout } from '@/features/auth';
import { useRouter } from 'next/router';

const SignoutPage: NextPage = () => {
  const router = useRouter();

  if (!router.isReady) return null;

  return <Signout />;
};

export default SignoutPage;
