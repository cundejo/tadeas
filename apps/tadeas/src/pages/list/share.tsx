import type { NextPage } from 'next';
import { Navbar, PageLoading, PageTitle, SecondaryMenu } from '@/common';
import { ListShare, useListsLoader } from '@/features/list';
import React from 'react';

const ShareListPage: NextPage = () => {
  const { isLoading } = useListsLoader();

  if (isLoading) return <PageLoading />;

  return (
    <>
      <Navbar leftContent={<PageTitle title="Share list" goBack />} rightContent={<SecondaryMenu />} />
      <ListShare />
    </>
  );
};

export default ShareListPage;
