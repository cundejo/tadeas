import React, { useEffect, useState } from 'react';
import { signIn } from '@/features/auth';
import { useRouter } from 'next/router';
import { Card, Text } from '@nextui-org/react';
import { Button, PageLoading } from '@/features/common';
import Link from 'next/link';

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
      <Card css={{ mt: '$lg' }}>
        <Card.Header>
          <Text b>Error on Sign In 🤔</Text>
        </Card.Header>
        <Card.Body>
          <Text>There was some weird shit signing you in. Please try again.</Text>
          <Text>
            <Button bordered css={{ mt: '$md' }}>
              <Link href="/">Go back and try again</Link>
            </Button>
          </Text>
        </Card.Body>
      </Card>
    );

  return <PageLoading />;
};
