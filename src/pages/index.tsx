import type { NextPage } from 'next';
import { Tasks } from '@/features/task';
import { Navbar, PageLoading } from '@/common';
import { ListMenu, ListsDropdown, useListsLoader } from '@/features/list';

const IndexPage: NextPage = () => {
  const { isLoading } = useListsLoader();

  if (isLoading) return <PageLoading />;

  return (
    <>
      <Navbar leftContent={<ListsDropdown />} rightContent={<ListMenu />} />
      <Tasks />
    </>
  );
};

export default IndexPage;
