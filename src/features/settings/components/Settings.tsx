import React, { useState } from 'react';
import { Button, ConfirmationModal, Description, List, ListItem } from '@/common';
import { MdLogin, MdLogout } from 'react-icons/md';
import { useUser } from '@/features/auth';
import { useRouter } from 'next/router';
import { styled } from '@nextui-org/react';

export const Settings: React.FC = () => {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [isConfirmingSignout, setIsConfirmingSignout] = useState(false);

  const handleSignIn = async () => {
    router.push('/auth/email');
  };

  const handleSignOut = async () => {
    setIsConfirmingSignout(true);
  };

  return (
    <Container>
      <List>
        <ListItem
          key="signed-user"
          extra={
            <Button
              auto
              color="primary"
              loading={isLoading}
              onClick={user ? handleSignOut : handleSignIn}
              icon={user ? <MdLogout /> : <MdLogin />}
            >
              {user ? 'Sign off' : 'Sign in'}
            </Button>
          }
        >
          <Description subTitle={user ? `You are signed in as ${user.email}` : `Please sign in`}>
            {user ? 'Signed in' : 'Signed off'}
          </Description>
        </ListItem>
      </List>

      <ConfirmationModal
        title="Are you sure?"
        confirmButtonText="Yes, sign off"
        visible={isConfirmingSignout}
        onConfirm={() => router.push(`/auth/signout`)}
        onCancel={() => setIsConfirmingSignout(false)}
      />
    </Container>
  );
};

const Container = styled('div', {
  padding: '0 $lg $lg',
  height: 'calc(100% - 60px)',
  overflow: 'auto',
});
