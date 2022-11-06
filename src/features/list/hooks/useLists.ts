import { useContext, useState } from 'react';
import { deleteList as deleteListApi, getListsByUser, List, upsertList } from '@/features/list';
import { AppContext, LOCAL_STORAGE_SELECTED_LIST_ID, useLocalStorage } from '@/features/common';
import { nanoid } from 'nanoid';
import { find, isEmpty } from 'lodash';
import { useAuth } from '@/features/auth';

type HookDto = {
  addList: (name: string) => Promise<void>;
  deleteList: (list: List) => Promise<void>;
  editList: (list: List) => Promise<void>;
  isLoading: boolean;
  listSelected: List;
  lists: List[];
  selectList: (list: List) => void;
};
/**
 * This hook depends on useListsLoader to load the data in the app context.
 */
export const useLists = (): HookDto => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const {
    appContext: { selectedListId, userLists },
    setAppContext,
  } = useContext(AppContext);
  const { setItem } = useLocalStorage(LOCAL_STORAGE_SELECTED_LIST_ID);

  if (isEmpty(userLists) || !selectedListId)
    throw new Error(`Hook useLists is being called without calling first useListsLoader.`);

  const addList = async (name: string) => {
    if (!user) throw new Error('User not signed in');

    setIsLoading(true);

    const newList: List = {
      id: nanoid(),
      tasks: [],
      name,
      owner: user.email!,
      sharedWith: [],
    };

    await upsertList(newList);
    const lists = await getListsByUser(user.email!);
    set({ selectedList: newList, lists });
    setIsLoading(false);
  };

  const editList = async (list: List) => {
    if (!user) throw new Error('User not signed in');
    setIsLoading(true);
    await upsertList(list);
    const lists = await getListsByUser(user.email!);
    set({ lists });
    setIsLoading(false);
  };

  const deleteList = async (list: List) => {
    // Avoid deleting the user default list.
    if (list.isDefault) return;

    setIsLoading(true);
    const lists = userLists.filter(({ id }) => id !== list.id);
    set({ selectedList: lists[0], lists });
    await deleteListApi(list);
    setIsLoading(false);
  };

  const selectList = (list: List) => set({ selectedList: list });

  /**
   * Set in local storage and app context the lists and the selected list.
   */
  const set = ({ lists, selectedList }: { lists?: List[]; selectedList?: List }) => {
    if (selectedList) setItem(selectedList.id);
    setAppContext((prev) => ({
      ...prev,
      selectedListId: selectedList ? selectedList.id : prev.selectedListId,
      userLists: lists ?? prev.userLists,
    }));
  };

  const listSelected = find(userLists, { id: selectedListId });
  if (!listSelected) throw new Error(`List with id ${selectedListId} not found.`);

  return {
    addList,
    deleteList,
    editList,
    isLoading,
    listSelected,
    lists: userLists,
    selectList,
  };
};
