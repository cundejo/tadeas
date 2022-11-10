import React from 'react';
import { LoginForm, useAuth } from '@/features/auth';
import { NextPage } from 'next';
import { Navbar, PageLoading, PageTitle, SecondaryMenu } from '@/features/common';
import { useRouter } from 'next/router';

const LoginFormPage: NextPage = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  if (isLoading) return <PageLoading />;

  // The user is signed in, so let's redirect they to home
  if (!isLoading && user) {
    router.push('/');
    return null;
  }

  return (
    <>
      <Navbar leftContent={<PageTitle title="Sign in" superTitle="Tadeas" />} rightContent={<SecondaryMenu />} />
      <LoginForm />
    </>
  );
};

export default LoginFormPage;
