import type { NextPage } from 'next';
import { GoBackLink, Navbar, SecondaryMenu } from '@/features/common';
import { SettingsPage } from '@/features/settings';
import { useRouter } from 'next/router';

const Settings: NextPage = () => {
  const router = useRouter();

  if (!router.isReady) return null;

  return (
    <>
      <Navbar leftContent={<GoBackLink />} rightContent={<SecondaryMenu />} />
      <SettingsPage />
    </>
  );
};

export default Settings;
