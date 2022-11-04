import React, { Key, useState } from 'react';
import { Dropdown, styled } from '@nextui-org/react';
import {
  MdInfoOutline,
  MdMenu,
  MdOutlineDeleteSweep,
  MdOutlineEditNote,
  MdOutlineShare,
  MdSettings,
} from 'react-icons/md';
import { ListEditModal, useLists } from '@/features/list';
import { ConfirmationModal } from '@/features/common';
import { useRouter } from 'next/router';

export const ListMenu: React.FC = () => {
  const router = useRouter();
  const { deleteList, listSelected } = useLists();
  const [isEditingList, setIsEditingList] = useState(false);
  const [isDeletingList, setIsDeletingList] = useState(false);

  const handleMenuAction = (key: Key) => {
    switch (key) {
      case 'rename':
        setIsEditingList(true);
        break;
      case 'share':
        router.push(`/list/share`);
        break;
      case 'deleteList':
        setIsDeletingList(true);
        break;
      case 'settings':
      case 'about':
        router.push(`/${key}`);
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
                Rename
              </Dropdown.Item>
              <Dropdown.Item key="share" icon={<MdOutlineShare />}>
                Share
              </Dropdown.Item>
              <Dropdown.Item
                key="deleteList"
                icon={<MdOutlineDeleteSweep />}
                description={listSelected?.isDefault ? "Default list can't be deleted" : undefined}
              >
                Delete
              </Dropdown.Item>
              {/*<Dropdown.Item key="deleteCompletedTasks" icon={<MdOutlineRemoveDone />}>*/}
              {/*  Delete completed tasks*/}
              {/*</Dropdown.Item>*/}
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

      {isEditingList && <ListEditModal onClose={() => setIsEditingList(false)} />}

      <ConfirmationModal
        visible={isDeletingList}
        message={
          <>
            Deleting list <code>{listSelected?.name}</code> will also delete all the tasks on the list. Are you sure?
          </>
        }
        onConfirm={handleDeleteList}
        onCancel={() => setIsDeletingList(false)}
        confirmButtonText="Yes, delete"
      />
    </>
  );
};

const Container = styled('nav', {
  '& button': {
    padding: 0,
    fs: '$lg',
  },
});
