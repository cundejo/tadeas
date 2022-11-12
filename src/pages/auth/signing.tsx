import React from 'react';
import { Signing } from '@/features/auth';
import { NextPage } from 'next';
import { Navbar, PageTitle, SecondaryMenu } from '@/features/common';

const SigningPage: NextPage = () => {
  return (
    <>
      <Navbar leftContent={<PageTitle title="Sign in" superTitle="Tadeas" />} />
      <Signing />
    </>
  );
};

export default SigningPage;
