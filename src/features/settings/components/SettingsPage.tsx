import React from 'react';
import { Button, Description, List, ListItem } from '@/features/common';
import { MdLogin, MdLogout } from 'react-icons/md';
import { useAuth } from '@/features/auth';

export const SettingsPage: React.FC = () => {
  const { user, isLoading } = useAuth();

  const handleSignIn = async () => {
    // setAuthModal({
    //   visible: true,
    //   message: 'We only need your email.',
    // });
  };

  const handleSignOut = async () => {
    // setSignoutConfirmModal(true);
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
          <Description
            title={user ? 'Signed in' : 'Signed off'}
            subTitle={user ? `You are signed in as ${user.email}` : `Please sign in`}
          />
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

      {/*<ModalAuthRequired*/}
      {/*  message={authModal.message}*/}
      {/*  onClose={() => setAuthModal({ visible: false, message: '' })}*/}
      {/*  visible={authModal.visible}*/}
      {/*/>*/}

      {/*<Modal title="Are you sure?" visible={signoutConfirmModal} onClose={() => setSignoutConfirmModal(false)}>*/}
      {/*  <Container display="flex" alignItems="center" justify="space-between">*/}
      {/*    <Button auto onClick={() => setSignoutConfirmModal(false)}>*/}
      {/*      Cancel*/}
      {/*    </Button>*/}
      {/*    <Button auto color="error" onClick={() => router.push(`/auth/signout`)}>*/}
      {/*      Yes, sign off*/}
      {/*    </Button>*/}
      {/*  </Container>*/}
      {/*</Modal>*/}
    </>
  );
};
