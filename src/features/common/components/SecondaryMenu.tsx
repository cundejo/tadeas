import React, { Key } from 'react';
import { Dropdown, styled } from '@nextui-org/react';
import { MdInfoOutline, MdMenu, MdSettings } from 'react-icons/md';

export const SecondaryMenu: React.FC = () => {
  const handleMenuAction = (key: Key) => {
    if (key === 'settings') console.log('Settings clicked');
    if (key === 'about') console.log('About clicked');
  };

  return (
    <>
      <Container>
        <Dropdown>
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
