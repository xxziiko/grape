import { handleError, NonNullable, supabase, UserInfo } from '@/shared';
import { AuthResponse, Session } from '@supabase/supabase-js';

export const signUpUser = async ({
  email,
  password,
}: UserInfo): Promise<NonNullable<AuthResponse['data']>> =>
  await supabase.auth
    .signUp({
      email,
      password,
    })
    .then(handleError);

export const signInUser = async ({
  email,
  password,
}: UserInfo): Promise<NonNullable<AuthResponse['data']>> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return handleError({ data, error });
};

export const signOutUser = async () => await supabase.auth.signOut();

export const fetchUserName = async (
  userId: NonNullable<string>,
): Promise<{
  user_name: string;
}> =>
  await supabase
    .from('users')
    .select('user_name')
    .eq('id', userId)
    .single()
    .then(handleError);

export const checkEmailExists = async (
  email: NonNullable<string>,
): Promise<boolean | null> => {
  const selectEamil = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .then(handleError);

  return !!selectEamil?.length;
};

export const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  return handleError({ data: data.session, error });
};

export const refreshToken = async (): Promise<Session> => {
  const { data, error } = await supabase.auth.refreshSession();
  return handleError({ data: data.session, error });
};
