import { getUser } from '../api';
import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';

type HookDto = {
  user: User | undefined;
  isLoading: boolean;
};

export const useUser = (): HookDto => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setUser(await getUser());
        setIsLoading(false);
      } catch (e) {
        setUser(undefined);
        setIsLoading(false);
      }
    })();
  }, []);

  return { user, isLoading };
};
