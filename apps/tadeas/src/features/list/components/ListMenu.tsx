import React, { Key, ReactNode, useState } from 'react';
import { Dropdown, styled } from '@nextui-org/react';
import {
  MdInfoOutline,
  MdMenu,
  MdOutlineDeleteSweep,
  MdOutlineEditNote,
  MdOutlineRemoveDone,
  MdOutlineShare,
  MdSettings,
} from 'react-icons/md';
import { ListEditModal, useLists } from '@/features/list';
import { ConfirmationModal } from '@/common';
import { useRouter } from 'next/router';
import { compact } from 'lodash';

type MenuSection = {
  title: string;
  children: MenuItem[];
};

type MenuItem = {
  key: string;
  title: string;
  icon: ReactNode;
  description?: string | boolean;
};

const useListMenu = () => {
  const router = useRouter();
  const { deleteList, listSelected, isSelectedListMine, deleteAllCompletedTasks } = useLists();
  const [isEditingList, setIsEditingList] = useState(false);
  const [isDeletingList, setIsDeletingList] = useState(false);
  const [isDeletingCompletedTasks, setIsDeletingCompletedTasks] = useState(false);

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
      case 'deleteCompletedTasks':
        setIsDeletingCompletedTasks(true);
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

  const handleDeleteAllCompletedTasks = () => {
    deleteAllCompletedTasks(listSelected!);
    setIsDeletingCompletedTasks(false);
  };

  const listSection: MenuSection = {
    title: 'Current List Actions',
    children: [
      { key: 'share', title: 'Share', icon: <MdOutlineShare /> },
      { key: 'rename', title: 'Rename', icon: <MdOutlineEditNote /> },
      {
        key: 'deleteList',
        title: 'Delete',
        icon: <MdOutlineDeleteSweep />,
        description: listSelected?.isDefault && "Default list can't be deleted",
      },
      { key: 'deleteCompletedTasks', title: 'Delete completed tasks', icon: <MdOutlineRemoveDone /> },
    ],
  };

  const appSection: MenuSection = {
    title: 'Application',
    children: [
      { key: 'settings', title: 'Settings', icon: <MdSettings /> },
      { key: 'about', title: 'About', icon: <MdInfoOutline /> },
    ],
  };

  const sections: MenuSection[] = compact([isSelectedListMine && listSection, appSection]);

  return {
    handleDeleteAllCompletedTasks,
    handleDeleteList,
    handleMenuAction,
    isDeletingCompletedTasks,
    isDeletingList,
    isEditingList,
    listSelected,
    sections,
    setIsDeletingList,
    setIsDeletingCompletedTasks,
    setIsEditingList,
  };
};

export const ListMenu: React.FC = () => {
  const {
    handleDeleteList,
    handleDeleteAllCompletedTasks,
    isDeletingCompletedTasks,
    handleMenuAction,
    isDeletingList,
    isEditingList,
    listSelected,
    sections,
    setIsDeletingList,
    setIsEditingList,
    setIsDeletingCompletedTasks,
  } = useListMenu();

  return (
    <>
      <Container>
        <Dropdown>
          <Dropdown.Button light auto icon={<MdMenu size="2rem" />} />
          <Dropdown.Menu
            aria-label="App Actions"
            onAction={handleMenuAction}
            disabledKeys={listSelected?.isDefault ? ['deleteList'] : []}
            items={sections}
          >
            {({ title, children }: any) => (
              <Dropdown.Section key={title} title={title} items={children}>
                {(item: any) => <Dropdown.Item {...item} />}
              </Dropdown.Section>
            )}
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

      <ConfirmationModal
        visible={isDeletingCompletedTasks}
        message={<>Are you sure you want to delete all completed tasks?</>}
        onConfirm={handleDeleteAllCompletedTasks}
        onCancel={() => setIsDeletingCompletedTasks(false)}
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
