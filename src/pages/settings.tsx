import type { NextPage } from 'next';
import { GoBackLink, Navbar, SecondaryMenu } from '@/features/common';
import { Settings } from '@/features/settings';
import { useRouter } from 'next/router';

const SettingsPage: NextPage = () => {
  const router = useRouter();

  if (!router.isReady) return null;

  return (
    <>
      <Navbar leftContent={<GoBackLink />} rightContent={<SecondaryMenu />} />
      <Settings />
    </>
  );
};

export default SettingsPage;
