import React, { useEffect } from 'react';
import { useAuth } from '@/features/auth';
import { useRouter } from 'next/router';
import { PageLoading } from '@/features/common';

export const Signout: React.FC = () => {
  const router = useRouter();
  const { signOut } = useAuth();

  useEffect(() => {
    (async () => {
      await signOut();
      router.push('/');
    })();
  }, [router]);

  return <PageLoading />;
};
