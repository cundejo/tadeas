import React from 'react';
import { LoginForm } from '@/features/auth';
import { NextPage } from 'next';
import { Navbar, SecondaryMenu } from '@/features/common';
import { Text } from '@nextui-org/react';

const LoginFormPage: NextPage = () => {
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
