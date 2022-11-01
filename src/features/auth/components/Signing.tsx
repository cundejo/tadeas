import React, { useEffect, useState } from 'react';
import { signIn } from '@/features/auth';
import { useRouter } from 'next/router';
import { Card, Text } from '@nextui-org/react';
import { PageLoading } from '@/features/common';

export const Signing: React.FC = () => {
  const router = useRouter();
  const [errorSigning, setErrorSigning] = useState(false);

  useEffect(() => {
    (async () => {
      const redirectTo = await signIn();
      if (redirectTo) router.push(redirectTo);
      else setErrorSigning(true);
    })();
  }, [router]);

  if (errorSigning)
    return (
      <Card color="error">
        <Text css={{ fontWeight: '$bold', color: '$white' }} transform="capitalize">
          Error on Sign In
        </Text>
        <Text css={{ color: '$white' }} span>
          There was some weird shit signing you in. Please try again.
        </Text>
      </Card>
    );

  return <PageLoading />;
};
