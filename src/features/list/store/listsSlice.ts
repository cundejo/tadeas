import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteList, getListsByUser, getSharedListsByUser, List, renameList, upsertList } from '@/features/list';
import { getLocalStorage, LOCAL_STORAGE_SELECTED_LIST_ID, setLocalStorage } from '@/common';
import { find, findIndex } from 'lodash';

export interface ListSliceState {
  selectedListId?: string;
  userLists: List[];
  userSharedLists: List[];
}

const initialState: ListSliceState = {
  selectedListId: undefined,
  userLists: [],
  userSharedLists: [],
};

export const getAllUserListsThunk = createAsyncThunk('lists/getAllUserLists', async (userEmail: string) =>
  Promise.all([getListsByUser(userEmail), getSharedListsByUser(userEmail)])
);
export const upsertListThunk = createAsyncThunk('lists/upsertList', async (list: List) => upsertList(list));

export const renameListThunk = createAsyncThunk(
  'lists/renameList',
  async ({ listId, name }: { listId: string; name: string }) => renameList(listId, name)
);

export const deleteListThunk = createAsyncThunk('lists/deleteList', async (list: List) => deleteList(list));

export const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    setSelectedListIdFromLocalStorage(state) {
      const selectedListId = getLocalStorage(LOCAL_STORAGE_SELECTED_LIST_ID);
      if (selectedListId && state.selectedListId !== selectedListId) state.selectedListId = selectedListId;
    },

    setSelectedListId(state, action) {
      const { selectedListId } = action.payload;
      if (selectedListId && state.selectedListId !== selectedListId) {
        state.selectedListId = selectedListId;
        setLocalStorage(LOCAL_STORAGE_SELECTED_LIST_ID, selectedListId);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllUserListsThunk.fulfilled, (state, action) => {
        const userLists = action.payload[0];
        const userSharedLists = action.payload[1];

        // If there is a selected list but it doesn't exist in the user lists, we set the first user list.
        if (state.selectedListId) {
          const list = find([...userLists, ...userSharedLists], { id: state.selectedListId });
          if (!list) {
            state.selectedListId = userLists[0].id;
            setLocalStorage(LOCAL_STORAGE_SELECTED_LIST_ID, userLists[0].id);
          }
        }

        // If there is no selected list, we set the first list in the array.
        if (!state.selectedListId) {
          state.selectedListId = userLists[0].id;
          setLocalStorage(LOCAL_STORAGE_SELECTED_LIST_ID, userLists[0].id);
        }

        state.userLists = userLists;
        state.userSharedLists = userSharedLists;
      })

      .addCase(upsertListThunk.fulfilled, (state, action) => {
        const newList = action.payload;
        const listIndex = findIndex(state.userLists, { id: newList.id });
        if (listIndex >= 0) state.userLists.splice(listIndex, 1, newList);
        else state.userLists.push(newList);
        // Checking that the list selected is the one added/changed
        if (state.selectedListId !== newList.id) {
          state.selectedListId = newList.id;
          setLocalStorage(LOCAL_STORAGE_SELECTED_LIST_ID, newList.id);
        }
      })

      .addCase(renameListThunk.fulfilled, (state, action) => {
        const newList = action.payload;
        const listIndex = findIndex(state.userLists, { id: newList.id });
        if (listIndex >= 0) state.userLists.splice(listIndex, 1, newList);
      })

      .addCase(deleteListThunk.fulfilled, (state, action) => {
        const deletedList = action.payload;
        const lists = state.userLists.filter(({ id }) => id !== deletedList.id);
        state.userLists = lists;
        state.selectedListId = lists[0].id;
        setLocalStorage(LOCAL_STORAGE_SELECTED_LIST_ID, lists[0].id);
      });
  },
});

export default listsSlice.reducer;

export const { setSelectedListIdFromLocalStorage, setSelectedListId } = listsSlice.actions;
