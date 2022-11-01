import { getUser, signOff } from '../api';
import { useEffect, useState } from 'react';
import { User } from 'firebase/auth';

type HookDto = {
  user: User | undefined;
  isLoading: boolean;
  signOut: () => Promise<void>;
};

export const useAuth = (): HookDto => {
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

  const signOut = async () => {
    setIsLoading(true);
    await signOff();
    setIsLoading(false);
  };

  return { user, isLoading, signOut };
};
