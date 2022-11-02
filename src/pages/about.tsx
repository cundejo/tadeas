import type { NextPage } from 'next';
import { GoBackLink, Navbar, SecondaryMenu } from '@/features/common';
import { AboutPage } from '@/features/about';

const About: NextPage = () => {
  return (
    <>
      <Navbar leftContent={<GoBackLink />} rightContent={<SecondaryMenu />} />
      <AboutPage />
    </>
  );
};

export default About;
