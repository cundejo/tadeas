import React from 'react';
import { LoginForm, Signing } from '@/features/auth';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { GoBackLink, Navbar, SecondaryMenu } from '@/features/common';

const LoginFormPage: NextPage = () => {
  const router = useRouter();

  if (!router.isReady) return null;

  return (
    <>
      <Navbar leftContent={<GoBackLink />} rightContent={<SecondaryMenu />} />
      <LoginForm />
    </>
  );
};

export default LoginFormPage;
