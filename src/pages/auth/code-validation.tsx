import React from 'react';
import { AuthCodeValidationForm, useAuth } from '@/features/auth';
import { NextPage } from 'next';
import { Navbar, PageLoading, PageTitle, SecondaryMenu } from '@/features/common';
import { useRouter } from 'next/router';

const AuthCodeValidationFormPage: NextPage = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  if (isLoading) return <PageLoading />;

  // If the user is signed in, redirect it to home
  if (!isLoading && user) {
    router.push('/');
    return null;
  }

  return (
    <>
      <Navbar leftContent={<PageTitle title="Sign in" superTitle="Tadeas" />} rightContent={<SecondaryMenu />} />
      <AuthCodeValidationForm />
    </>
  );
};

export default AuthCodeValidationFormPage;
