import type { NextPage } from 'next';
import { Tasks } from '@/features/task';
import { Navbar, PageLoading } from '@/features/common';
import { ListMenu, ListsDropdown } from '@/features/list';
import { useRouter } from 'next/router';
import { useAuth } from '@/features/auth';

const IndexPage: NextPage = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  if (isLoading) return <PageLoading />;

  if (!user) {
    router.push('/auth/login-form');
    return null;
  }

  return (
    <>
      <Navbar leftContent={<ListsDropdown user={user!} />} rightContent={<ListMenu user={user!} />} />
      <Tasks />
    </>
  );
};

export default IndexPage;
