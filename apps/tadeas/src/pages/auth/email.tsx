import React from 'react';
import { AuthEmailForm, useUser } from '@/features/auth';
import { NextPage } from 'next';
import { Navbar, PageLoading, PageTitle, SecondaryMenu } from '@/common';
import { useRouter } from 'next/router';

const AuthEmailFormPage: NextPage = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();

  if (isLoading) return <PageLoading />;

  // If the user is signed in, redirect it to home
  if (!isLoading && user) {
    router.push('/');
    return null;
  }

  return (
    <>
      <Navbar leftContent={<PageTitle title="Sign in" superTitle="Tadeas" />} rightContent={<SecondaryMenu />} />
      <AuthEmailForm />
    </>
  );
};

export default AuthEmailFormPage;
