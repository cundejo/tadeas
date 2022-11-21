import type { NextPage } from 'next';
import { Navbar, PageTitle, SecondaryMenu } from '@/common';
import { About } from '@/features/about';
import React from 'react';

const AboutPage: NextPage = () => {
  return (
    <>
      <Navbar leftContent={<PageTitle title="About" goBack />} rightContent={<SecondaryMenu />} />
      <About />
    </>
  );
};

export default AboutPage;
