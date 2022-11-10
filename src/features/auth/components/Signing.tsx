import React, { useEffect } from 'react';
import { signIn } from '@/features/auth';
import { useRouter } from 'next/router';
import { PageLoading } from '@/features/common';

export const Signing: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const redirectTo = await signIn();
      router.push(redirectTo);
    })();
  }, [router]);

  return <PageLoading />;
};
