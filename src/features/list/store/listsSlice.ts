import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteList, getListsByUser, getSharedListsByUser, List, upsertList } from '@/features/list';
import { LOCAL_STORAGE_SELECTED_LIST_ID } from '@/features/common';
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

export const getListsByUserThunk = createAsyncThunk('lists/getListsByUser', async (userEmail: string) =>
  getListsByUser(userEmail)
);

export const getSharedListsByUserThunk = createAsyncThunk('lists/getSharedListsByUser', async (userEmail: string) =>
  getSharedListsByUser(userEmail)
);

export const upsertListThunk = createAsyncThunk('lists/upsertList', async (list: List) => upsertList(list));

export const deleteListThunk = createAsyncThunk('lists/deleteList', async (list: List) => deleteList(list));

export const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    setSelectedListIdFromLocalStorage(state, action) {
      const { selectedListIdLocalStorage } = action.payload;
      state.selectedListId = selectedListIdLocalStorage;
    },

    setSelectedListId(state, action) {
      const { selectedListId } = action.payload;
      state.selectedListId = selectedListId;
      window.localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID, selectedListId);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getListsByUserThunk.fulfilled, (state, action) => {
        // If there is a selected list but it doesn't exist in the user lists, we set the first user list.
        if (state.selectedListId) {
          const list = find(action.payload, { id: state.selectedListId });
          if (!list) {
            state.selectedListId = action.payload[0].id;
            window.localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID, action.payload[0].id);
          }
        }

        // If there is no selected list, we set the first list in the array.
        if (!state.selectedListId) {
          const lists = [...action.payload, ...state.userSharedLists];
          state.selectedListId = lists[0].id;
          window.localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID, lists[0].id);
        }

        state.userLists = action.payload;
      })

      .addCase(getSharedListsByUserThunk.fulfilled, (state, action) => {
        state.userSharedLists = action.payload;
      })

      .addCase(upsertListThunk.fulfilled, (state, action) => {
        const newList = action.payload;
        const listIndex = findIndex(state.userLists, { id: newList.id });
        if (listIndex >= 0) state.userLists.splice(listIndex, 1, newList);
        else state.userLists.push(newList);
        // Checking that the list selected is the one added/changed
        if (state.selectedListId !== newList.id) {
          state.selectedListId = newList.id;
          window.localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID, newList.id);
        }
      })

      .addCase(deleteListThunk.fulfilled, (state, action) => {
        const deletedList = action.payload;
        const lists = state.userLists.filter(({ id }) => id !== deletedList.id);
        state.userLists = lists;
        state.selectedListId = lists[0].id;
        window.localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID, lists[0].id);
      });
  },
});

export default listsSlice.reducer;

export const { setSelectedListIdFromLocalStorage, setSelectedListId } = listsSlice.actions;
