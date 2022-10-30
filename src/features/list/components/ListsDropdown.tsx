import React, { Key, useState } from 'react';
import { Dropdown, styled } from '@nextui-org/react';
import { ModalAddList, useUserLists } from '@/features/list';
import { MdCheck, MdPlaylistAdd } from 'react-icons/md';

const ADD_NEW_LIST = 'ADD_NEW_LIST';

type Props = {};

export const ListsDropdown: React.FC<Props> = () => {
  const [isAddingList, setIsAddingList] = useState(false);
  const { lists, listSelected, selectList, addList } = useUserLists('owner@email.com');

  const handleMenuAction = (key: Key) => {
    if (key === ADD_NEW_LIST) {
      setIsAddingList(true);
    } else {
      const list = lists.find((l) => l.id === key);
      if (!list) throw new Error(`List with id ${key} not found`);
      selectList(list);
    }
  };

  return (
    <>
      <Container>
        <h3>Tasks</h3>
        <Dropdown>
          <Dropdown.Button light>{listSelected?.name}</Dropdown.Button>
          <Dropdown.Menu aria-label="My Lists" onAction={handleMenuAction} disabledKeys={[listSelected?.id as Key]}>
            <Dropdown.Section title="All my lists" items={lists}>
              {(list) => (
                <Dropdown.Item icon={listSelected?.id === list.id ? <MdCheck /> : <EmptyIcon />} key={list.id}>
                  {list.name}
                </Dropdown.Item>
              )}
            </Dropdown.Section>
            <Dropdown.Item key={ADD_NEW_LIST} icon={<MdPlaylistAdd />} withDivider>
              Create new list
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>

      <ModalAddList onClose={() => setIsAddingList(false)} visible={isAddingList} onAdd={addList} />
    </>
  );
};

const EmptyIcon = styled('span', {
  display: 'block',
  width: '1em',
  height: '1em',
});

const Container = styled('nav', {
  '& h3': {
    m: 0,
    fs: '$xs',
    fontWeight: 200,
    textTransform: 'uppercase',
    letterSpacing: '0.05rem',
  },

  '& button': {
    padding: 0,
    fs: '$lg',
  },
});
