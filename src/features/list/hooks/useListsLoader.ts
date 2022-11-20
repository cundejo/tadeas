import { useEffect } from 'react';
import { getAllUserListsThunk, setSelectedListIdFromLocalStorage } from '@/features/list';
import { RootState, useDispatch } from '@/features/common';
import { isEmpty } from 'lodash';
import { useUser } from '@/features/auth';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

type HookDto = {
  isLoading: boolean;
};

/**
 * - It will load the user lists, and user shared lists
 * - To define the selected list first check in the local storage, if there is nothing, get the first item in user lists
 * - Set in local storage the id of the selected list if exists, if not it will set the id of the first list
 */
export const useListsLoader = (): HookDto => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isLoading: isLoadingUser } = useUser();
  const userLists = useSelector((state: RootState) => state.lists.userLists);
  const selectedListId = useSelector((state: RootState) => state.lists.selectedListId);

  useEffect(() => {
    dispatch(setSelectedListIdFromLocalStorage());
  }, []);

  useEffect(() => {
    if (!user) return;

    let cleaning = false;

    (async () => {
      dispatch(getAllUserListsThunk(user.email!));
    })();

    return () => {
      cleaning = true;
    };
  }, [user]);

  // The user is not signed in, so let's redirect him to login form
  if (!isLoadingUser && !user) {
    router.push('/auth/email');
  }

  return {
    // Every user has at least one list, and one list need to be selected.
    isLoading: !selectedListId || isEmpty(userLists),
  };
};
