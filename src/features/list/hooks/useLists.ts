import { deleteListThunk, List, setSelectedListId, upsertListThunk } from '@/features/list';
import { RootState, useDispatch } from '@/features/common';
import { nanoid } from 'nanoid';
import { find, isEmpty } from 'lodash';
import { useAuth } from '@/features/auth';
import { useSelector } from 'react-redux';

type HookDto = {
  addList: (name: string) => Promise<void>;
  deleteList: (list: List) => Promise<void>;
  editList: (list: List) => Promise<void>;
  isSelectedListMine: boolean;
  listSelected?: List;
  lists: List[];
  listsSharedWithMe: List[];
  selectList: (list: List) => void;
};
/**
 * This hook depends on useListsLoader to load the data in the app context.
 */
export const useLists = (): HookDto => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const userLists = useSelector((state: RootState) => state.lists.userLists);
  const userSharedLists = useSelector((state: RootState) => state.lists.userSharedLists);
  const selectedListId = useSelector((state: RootState) => state.lists.selectedListId);

  if (isEmpty(userLists) || !selectedListId)
    throw new Error(`Hook useLists is being called without calling first useListsLoader.`);

  const addList = async (name: string) => {
    if (!user) throw new Error('User not signed in');
    const newList = {
      id: nanoid(),
      tasks: [],
      name,
      owner: user.email!,
      sharedWith: [],
    };
    await dispatch(upsertListThunk(newList));
  };

  const editList = async (list: List) => {
    if (!user) throw new Error('User not signed in');
    await dispatch(upsertListThunk(list));
  };

  const deleteList = async (list: List) => {
    // Avoid deleting the user default list.
    if (list.isDefault) return;
    await dispatch(deleteListThunk(list));
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
    selectList,
  };
};
