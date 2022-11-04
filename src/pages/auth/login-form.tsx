import React from 'react';
import { LoginForm } from '@/features/auth';
import { NextPage } from 'next';
import { Navbar, PageTitle, SecondaryMenu } from '@/features/common';

const LoginFormPage: NextPage = () => {
  return (
    <>
      <Navbar leftContent={<PageTitle title="Sign in" superTitle="Tadeas" />} rightContent={<SecondaryMenu />} />
      <LoginForm />
    </>
  );
};

export default LoginFormPage;
