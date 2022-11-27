import type { NextPage } from 'next';
import { Tasks } from '@/features/task';
import { Navbar, PageLoading } from '@/common';
import { ListMenu, ListsDropdown, useListsLoader } from '@/features/list';
import { styled } from '@nextui-org/react';

const IndexPage: NextPage = () => {
  const { isLoading } = useListsLoader();

  if (isLoading) return <PageLoading />;

  return (
    <Container>
      <Navbar leftContent={<ListsDropdown />} rightContent={<ListMenu />} />
      <Tasks />
    </Container>
  );
};

export default IndexPage;

const Container = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
});
