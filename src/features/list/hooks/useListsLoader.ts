import { useContext, useEffect, useState } from 'react';
import { createDefaultListForNewUser, getListsByUser, getSharedListsByUser } from '@/features/list';
import { AppContext, LOCAL_STORAGE_SELECTED_LIST_ID, useLocalStorage } from '@/features/common';
import { isEmpty } from 'lodash';
import { useAuth } from '@/features/auth';
import { useRouter } from 'next/router';

type HookDto = {
  isLoading: boolean;
};
/**
 * - It will load the user lists
 * - It will load the user shared lists if loadSharedLists is true
 * - Save in the application context: user lists, user shared lists, and the selected list
 * - To define the selected list first check in the local storage, if there is nothing, get the first item in user lists
 * - Set in local storage the id of the selected list
 */
export const useListsLoader = (loadSharedLists = true): HookDto => {
  const router = useRouter();
  const { user, isLoading: isLoadingUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const {
    appContext: { userLists },
    setAppContext,
  } = useContext(AppContext);
  const { item, setItem } = useLocalStorage(LOCAL_STORAGE_SELECTED_LIST_ID);

  useEffect(() => {
    setIsLoading(true);
    if (!user) return;

    let cleaning = false;

    (async () => {
      const lists = await getUserLists(user.email!);
      const sharedLists = loadSharedLists ? await getUserSharedLists(user.email!) : [];
      if (cleaning) return;
      // The selected list comes from the local storage, if it's empty we set the first list in the array.
      let list = [...lists, ...sharedLists].find(({ id }) => id === item);
      if (!list) list = lists[0];
      setItem(list.id);
      setAppContext({ userLists: lists, userSharedLists: sharedLists, selectedListId: list.id });
      setIsLoading(false);
    })();

    return () => {
      cleaning = true;
    };
  }, [user]);

  const getUserLists = async (userEmail: string) => {
    const lists = await getListsByUser(userEmail);
    if (!isEmpty(lists)) return lists;

    // Every user should have a default list, so we create it here if the user hasn't any list.
    await createDefaultListForNewUser(userEmail);
    return getListsByUser(userEmail);
  };

  const getUserSharedLists = async (userEmail: string) => {
    return getSharedListsByUser(userEmail);
  };

  // The user is not signed in, so let's redirect him to login form
  if (!isLoadingUser && !user) {
    router.push('/auth/login-form');
  }

  return {
    // Every user has at least one list
    isLoading: isLoadingUser || isLoading || isEmpty(userLists),
  };
};
