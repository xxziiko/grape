import { Session } from '@supabase/supabase-js';
import { atom } from 'jotai';
import { atomWithSuspenseQuery } from 'jotai-tanstack-query';
import { fetchUserName } from './apis';

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
export const sessionAtom = atom<Session | null>(null);
export const userIdAtom = atom<string | undefined>(
  (get) => get(sessionAtom)?.user.id,
);
