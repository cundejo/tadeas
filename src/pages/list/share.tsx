import type { NextPage } from 'next';
import { GoBackLink, Navbar, PageLoading, SecondaryMenu } from '@/features/common';
import { ListShare, useListsLoader } from '@/features/list';

const ShareListPage: NextPage = () => {
  const { isLoading } = useListsLoader();

  if (isLoading) return <PageLoading />;

  return (
    <>
      <Navbar leftContent={<GoBackLink />} rightContent={<SecondaryMenu />} />
      <ListShare />
    </>
  );
};

export default ShareListPage;
