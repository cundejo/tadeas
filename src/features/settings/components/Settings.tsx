import React, { useState } from 'react';
import { Button, ConfirmationModal, Description, List, ListItem, TextColorful } from '@/features/common';
import { MdLogin, MdLogout } from 'react-icons/md';
import { useAuth } from '@/features/auth';
import { useRouter } from 'next/router';

export const Settings: React.FC = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [isConfirmingSignout, setIsConfirmingSignout] = useState(false);

  const handleSignIn = async () => {
    router.push('/auth/email');
  };

  const handleSignOut = async () => {
    setIsConfirmingSignout(true);
  };

  return (
    <>
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
        {/*<ListItem*/}
        {/*  key="theme"*/}
        {/*  extra={*/}
        {/*    <Switch initialChecked={theme === 'dark'} onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')} />*/}
        {/*  }*/}
        {/*>*/}
        {/*  <Description title="Theme" subTitle="Light or dark" />*/}
        {/*</ListItem>*/}
        {/*<ListItem*/}
        {/*  key="feedback"*/}
        {/*  extra={*/}
        {/*    <Button auto color="primary" loading={isLoading} onClick={handleFeedbackEmail} icon={<MdOutlineMail />}>*/}
        {/*      Email us*/}
        {/*    </Button>*/}
        {/*  }*/}
        {/*>*/}
        {/*  <Description title="Feedback" subTitle="If you find an issue, or have a good idea, please let us know" />*/}
        {/*</ListItem>*/}
      </List>

      <ConfirmationModal
        title="Are you sure?"
        confirmButtonText="Yes, sign off"
        visible={isConfirmingSignout}
        onConfirm={() => router.push(`/auth/signout`)}
        onCancel={() => setIsConfirmingSignout(false)}
      />
    </>
  );
};
