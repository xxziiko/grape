import { atom } from 'jotai';
import { atomWithSuspenseQuery } from 'jotai-tanstack-query';
import { fetchUserName } from './apis';
import { atomWithDefault } from 'jotai/utils';
import { Session } from '@supabase/supabase-js';

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

export const userNameQueryAtom = atom<string>('');

export const sessionAtom = atomWithDefault<Session>(() => {
  const session = localStorage.getItem(
    `sb-${import.meta.env.VITE_SUPABASE_ID}-auth-token`,
  );

  return session ? JSON.parse(session) : null;
});

export const userIdAtom = atom<string>((get) => get(sessionAtom)?.user.id);
