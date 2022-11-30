import React, { Key, useState } from 'react';
import { Dropdown, styled } from '@nextui-org/react';
import { ListAddModal, useLists } from '@/features/list';
import { MdCheck, MdPlaylistAdd } from 'react-icons/md';
import { RootState } from '@/common';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

const ADD_NEW_LIST = 'ADD_NEW_LIST';

const useListsDropdown = () => {
  const { listsSharedWithMe, listSelected, selectList } = useLists();
  const lists = useSelector((state: RootState) => state.lists.userLists);
  const [isAddingList, setIsAddingList] = useState(false);

  const handleMenuAction = (key: Key) => {
    if (key === ADD_NEW_LIST) {
      setIsAddingList(true);
    } else {
      const list = [...lists, ...listsSharedWithMe].find(({ id }) => id === key);
      if (!list) throw new Error(`List with id ${key} not found`);
      selectList(list);
    }
  };

  return { listSelected, handleMenuAction, lists, listsSharedWithMe, isAddingList, setIsAddingList };
};

export const ListsDropdown: React.FC = () => {
  const { listSelected, handleMenuAction, lists, listsSharedWithMe, isAddingList, setIsAddingList } =
    useListsDropdown();

  return (
    <>
      <Container>
        <Dropdown disableAnimation>
          <Dropdown.Button light>{listSelected?.name}</Dropdown.Button>
          <Dropdown.Menu aria-label="My Lists" onAction={handleMenuAction} disabledKeys={[listSelected?.id as Key]}>
            <Dropdown.Section title="All my lists" items={lists}>
              {(list) => (
                <Dropdown.Item icon={listSelected?.id === list.id ? <MdCheck /> : <EmptyIcon />} key={list.id}>
                  {list.name}
                </Dropdown.Item>
              )}
            </Dropdown.Section>
            {!isEmpty(listsSharedWithMe) &&
              ((
                <Dropdown.Section title="Shared with me" items={listsSharedWithMe}>
                  {(list) => (
                    <Dropdown.Item icon={listSelected?.id === list.id ? <MdCheck /> : <EmptyIcon />} key={list.id}>
                      {list.name}
                    </Dropdown.Item>
                  )}
                </Dropdown.Section>
              ) as any)}
            <Dropdown.Item key={ADD_NEW_LIST} icon={<MdPlaylistAdd />} withDivider>
              Create new list
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>

      {isAddingList && <ListAddModal onClose={() => setIsAddingList(false)} />}
    </>
  );
};

const EmptyIcon = styled('span', {
  display: 'block',
  width: '1em',
  height: '1em',
});

const Container = styled('nav', {
  '& button': {
    padding: 0,
    fs: '$lg',
  },
});
