import type { NextPage } from 'next';
import { GoBackLink, Navbar, SecondaryMenu } from '@/features/common';
import { Settings } from '@/features/settings';

const SettingsPage: NextPage = () => {
  return (
    <>
      <Navbar leftContent={<GoBackLink />} rightContent={<SecondaryMenu />} />
      <Settings />
    </>
  );
};

export default SettingsPage;
