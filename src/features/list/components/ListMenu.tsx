import React, { Key, useState } from 'react';
import { Dropdown, styled } from '@nextui-org/react';
import {
  MdInfoOutline,
  MdMenu,
  MdOutlineDeleteSweep,
  MdOutlineEditNote,
  MdOutlineRemoveDone,
  MdSettings,
} from 'react-icons/md';
import { ListEditModal, useUserLists } from '@/features/list';
import { ConfirmationModal } from '@/features/common';

export const ListMenu: React.FC = () => {
  const { deleteList, editList, listSelected } = useUserLists('owner@email.com');
  const [isEditingList, setIsEditingList] = useState(false);
  const [isDeletingList, setIsDeletingList] = useState(false);

  const handleMenuAction = (key: Key) => {
    if (key === 'rename') {
      setIsEditingList(true);
    }

    switch (key) {
      case 'rename':
        setIsEditingList(true);
        break;
      case 'deleteList':
        setIsDeletingList(true);
        break;
      default:
        break;
    }
  };

  const handleDeleteList = () => {
    deleteList(listSelected!);
    setIsDeletingList(false);
  };

  return (
    <>
      <Container>
        <Dropdown>
          <Dropdown.Button light auto icon={<MdMenu size="2rem" />} />
          <Dropdown.Menu
            aria-label="App Actions"
            onAction={handleMenuAction}
            disabledKeys={listSelected?.isDefault ? ['deleteList'] : []}
          >
            <Dropdown.Section title="Current List Actions">
              <Dropdown.Item key="rename" icon={<MdOutlineEditNote />}>
                Rename list
              </Dropdown.Item>
              <Dropdown.Item
                key="deleteList"
                icon={<MdOutlineDeleteSweep />}
                description={listSelected?.isDefault ? "Default list can't be deleted" : undefined}
              >
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
              <Dropdown.Item key="about" icon={<MdInfoOutline />}>
                About
              </Dropdown.Item>
            </Dropdown.Section>
          </Dropdown.Menu>
        </Dropdown>
      </Container>

      {listSelected && (
        <>
          <ListEditModal
            key={listSelected.id}
            list={listSelected}
            onClose={() => setIsEditingList(false)}
            visible={isEditingList}
            onChange={(list) => editList(list)}
          />
          <ConfirmationModal
            visible={isDeletingList}
            message={
              <>
                Deleting list <code>{listSelected.name}</code> will also delete all the tasks on the list. Are you sure?
              </>
            }
            onConfirm={handleDeleteList}
            onCancel={() => setIsDeletingList(false)}
          />
        </>
      )}
    </>
  );
};

const Container = styled('nav', {
  '& button': {
    padding: 0,
    fs: '$lg',
  },
});
