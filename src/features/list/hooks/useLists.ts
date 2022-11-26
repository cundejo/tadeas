import { deleteListThunk, List, renameListThunk, setSelectedListId, upsertListThunk } from '@/features/list';
import { RootState, useDispatch } from '@/common';
import { nanoid } from 'nanoid';
import { find, isEmpty } from 'lodash';
import { useUser } from '@/features/auth';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteListTasks, upsertListTasks } from '@/features/task';

type HookDto = {
  addList: (name: string) => Promise<void>;
  deleteList: (list: List) => Promise<void>;
  editList: (list: List) => Promise<void>;
  isSelectedListMine: boolean;
  listSelected?: List;
  lists: List[];
  listsSharedWithMe: List[];
  renameList: (listId: string, name: string) => Promise<void>;
  selectList: (list: List) => void;
};
/**
 * This hook depends on useListsLoader to load the data in the app context.
 */
export const useLists = (): HookDto => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const userLists = useSelector((state: RootState) => state.lists.userLists);
  const userSharedLists = useSelector((state: RootState) => state.lists.userSharedLists);
  const selectedListId = useSelector((state: RootState) => state.lists.selectedListId);

  if (isEmpty(userLists) || !selectedListId)
    throw new Error(`Hook useLists is being called without calling first useListsLoader.`);

  const addList = async (name: string) => {
    const newList: List = {
      id: nanoid(),
      name,
      owner: user!.email!,
      sharedWith: [],
    };
    await dispatch(upsertListThunk(newList));
    await upsertListTasks({ id: newList.id, tasks: [], tasksCompleted: [] });
  };

  const editList = async (list: List) => {
    await dispatch(upsertListThunk(list));
  };

  const renameList = async (listId: string, name: string) => {
    await dispatch(renameListThunk({ listId, name }));
  };

  const deleteList = async (list: List) => {
    // Avoid deleting the user default list.
    if (list.isDefault) return;
    await dispatch(deleteListThunk(list.id));
    await deleteListTasks(list.id);
    toast.success(`List ${list.name} deleted`);
  };

  const selectList = async (list: List) => await dispatch(setSelectedListId({ selectedListId: list.id }));

  const listSelected = find([...userLists, ...userSharedLists], { id: selectedListId });
  const isSelectedListMine = listSelected ? user?.email === listSelected.owner : false;

  return {
    addList,
    deleteList,
    editList,
    isSelectedListMine,
    listSelected,
    lists: userLists,
    listsSharedWithMe: userSharedLists,
    renameList,
    selectList,
  };
};
