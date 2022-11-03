import React, { Key, useState } from 'react';
import { Dropdown, styled } from '@nextui-org/react';
import { ListEditModal, useUserLists } from '@/features/list';
import { MdCheck, MdPlaylistAdd } from 'react-icons/md';
import { User } from 'firebase/auth';

const ADD_NEW_LIST = 'ADD_NEW_LIST';

type Props = {
  user: User;
};

export const ListsDropdown: React.FC<Props> = ({ user }) => {
  const { lists, listSelected, selectList, addList, isLoading } = useUserLists(user.email!);
  const [isAddingList, setIsAddingList] = useState(false);

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

      {!isLoading && (
        <ListEditModal
          onClose={() => setIsAddingList(false)}
          visible={isAddingList}
          onChange={(list) => addList(list.name)}
        />
      )}
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
