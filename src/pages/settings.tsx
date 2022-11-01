import type { NextPage } from 'next';
import { GoBackLink, Navbar, SecondaryMenu } from '@/features/common';
import { SettingsPage } from '@/features/settings';

const Settings: NextPage = () => {
  return (
    <>
      <Navbar leftContent={<GoBackLink />} rightContent={<SecondaryMenu />} />
      <SettingsPage />
    </>
  );
};

export default Settings;
