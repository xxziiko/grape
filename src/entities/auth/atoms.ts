import { atom } from 'jotai';
import { atomWithSuspenseQuery } from 'jotai-tanstack-query';
import { fetchUserName } from './apis';
import { Session } from '@supabase/supabase-js';
import { atomWithDefault } from 'jotai/utils';

export const userNameAtom = atomWithSuspenseQuery((get) => ({
  queryKey: ['userName', get(userIdAtom)],
  queryFn: async () => {
    const userId = get(userIdAtom);
    if (!userId) return null;

    const query = await fetchUserName(userId);
    return query?.user_name;
  },
  enabled: !!get(userIdAtom),
}));

export const userNameQueryAtom = atom<string | null>(null);

export const sessionAtom = atomWithDefault<Session | null>(() => {
  const session = localStorage.getItem(
    `sb-${import.meta.env.VITE_SUPABASE_ID}-auth-token`,
  );

  return JSON.parse(session!);
});

export const userIdAtom = atom<string | undefined>(
  (get) => get(sessionAtom)?.user.id,
);
