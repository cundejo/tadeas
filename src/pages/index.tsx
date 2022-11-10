import type { NextPage } from 'next';
import { Tasks } from '@/features/task';
import { log, Navbar, PageLoading } from '@/features/common';
import { ListMenu, ListsDropdown, useListsLoader } from '@/features/list';

const IndexPage: NextPage = () => {
  const { isLoading } = useListsLoader();

  log('Re-rendering IndexPage');

  if (isLoading) return <PageLoading />;

  return (
    <>
      <Navbar leftContent={<ListsDropdown />} rightContent={<ListMenu />} />
      <Tasks />
    </>
  );
};

export default IndexPage;
