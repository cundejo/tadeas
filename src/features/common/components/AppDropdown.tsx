import React, { Key } from 'react';
import { Dropdown, styled } from '@nextui-org/react';
import {
  MdMenu,
  MdOutlineCoffee,
  MdOutlineDeleteSweep,
  MdOutlineEditNote,
  MdOutlineFeedback,
  MdOutlineRemoveDone,
  MdSettings,
} from 'react-icons/md';

export const AppDropdown: React.FC = () => {
  const handleMenuAction = (key: Key) => {
    console.log('clicked action', key);
  };

  return (
    <>
      <Container>
        <Dropdown>
          <Dropdown.Button light auto icon={<MdMenu size="2rem" />} />
          <Dropdown.Menu aria-label="App Actions" onAction={handleMenuAction}>
            <Dropdown.Section title="Current List Actions">
              <Dropdown.Item key="rename" icon={<MdOutlineEditNote />}>
                Rename list
              </Dropdown.Item>
              <Dropdown.Item key="deleteList" icon={<MdOutlineDeleteSweep />}>
                Delete list
              </Dropdown.Item>
              <Dropdown.Item key="deleteCompletedTasks" icon={<MdOutlineRemoveDone />}>
                Delete completed tasks
              </Dropdown.Item>
            </Dropdown.Section>
            <Dropdown.Section title="Application">
              <Dropdown.Item key="settings" icon={<MdSettings />}>
                Settings
              </Dropdown.Item>
              <Dropdown.Item key="feedback" icon={<MdOutlineFeedback />}>
                Feedback
              </Dropdown.Item>
              <Dropdown.Item key="buyMeCoffee" icon={<MdOutlineCoffee />}>
                Buy me a coffee
              </Dropdown.Item>
            </Dropdown.Section>
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
