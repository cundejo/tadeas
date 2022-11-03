import React from 'react';
import { LoginForm, Signing } from '@/features/auth';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import { GoBackLink, Navbar, SecondaryMenu } from '@/features/common';
import { MdOutlineArrowBack } from 'react-icons/md';
import { Text } from '@nextui-org/react';

const LoginFormPage: NextPage = () => {
  const router = useRouter();

  if (!router.isReady) return null;

  return (
    <>
      <Navbar
        leftContent={
          <Text css={{ fs: '1.5em' }} h2>
            Sign in
          </Text>
        }
        rightContent={<SecondaryMenu />}
      />
      <LoginForm />
    </>
  );
};

export default LoginFormPage;
