import type { NextPage } from 'next';
import { Navbar, PageTitle, SecondaryMenu } from '@/features/common';
import { Settings } from '@/features/settings';
import React from 'react';

const SettingsPage: NextPage = () => {
  return (
    <>
      <Navbar leftContent={<PageTitle title="Settings" goBack />} rightContent={<SecondaryMenu />} />
      <Settings />
    </>
  );
};

export default SettingsPage;
