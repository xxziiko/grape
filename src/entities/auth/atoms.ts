import { handleError, supabase } from '@/shared';
import { Session } from '@supabase/supabase-js';
import { atom } from 'jotai';
import { atomWithSuspenseQuery } from 'jotai-tanstack-query';

export const userNameQueryAtom = atomWithSuspenseQuery((get) => ({
  queryKey: ['userName', get(userIdAtom)],
  queryFn: async () => {
    const userId = get(userIdAtom);
    if (!userId) return null;

    return await supabase
      .from('profiles')
      .select('username')
      .eq('id', userId)
      .single()
      .then(handleError);
  },
  enabled: !!get(userIdAtom), // userId가 있을 때만 실행
}));

export const sessionAtom = atom<Session | null>(null);
export const userIdAtom = atom<string | null>(null);
