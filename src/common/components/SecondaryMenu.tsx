import React, { Key } from 'react';
import { Dropdown, styled } from '@nextui-org/react';
import { MdInfoOutline, MdMenu, MdSettings } from 'react-icons/md';
import { useRouter } from 'next/router';

export const SecondaryMenu: React.FC = () => {
  const router = useRouter();

  const handleMenuAction = (key: Key) => {
    router.push(`/${key}`);
  };

  return (
    <>
      <Container>
        <Dropdown disableAnimation>
          <Dropdown.Button light auto icon={<MdMenu size="2rem" />} />
          <Dropdown.Menu aria-label="App Actions" onAction={handleMenuAction}>
            <Dropdown.Item key="settings" icon={<MdSettings />}>
              Settings
            </Dropdown.Item>
            <Dropdown.Item key="about" icon={<MdInfoOutline />}>
              About
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </>
  );
};

const Container = styled('nav', {
  '& button': {
    padding: 0,
    fs: '$lg',
  },
});
