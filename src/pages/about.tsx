import type { NextPage } from 'next';
import { GoBackLink, Navbar, SecondaryMenu } from '@/features/common';
import { About } from '@/features/about';

const AboutPage: NextPage = () => {
  return (
    <>
      <Navbar leftContent={<GoBackLink />} rightContent={<SecondaryMenu />} />
      <About />
    </>
  );
};

export default AboutPage;
