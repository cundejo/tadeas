import type { NextPage } from 'next';
import { TasksPage } from '@/features/task';
import { Navbar } from '@/features/common';
import { ListMenu, ListsDropdown } from '@/features/list';

const Home: NextPage = () => {
  return (
    <>
      <Navbar leftContent={<ListsDropdown />} rightContent={<ListMenu />} />
      <TasksPage />
    </>
  );
};

export default Home;
