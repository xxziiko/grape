import { handleError, supabase, UserInfo } from '@/shared';

export const signUpUser = async ({ email, password }: UserInfo) =>
  await supabase.auth
    .signUp({
      email,
      password,
    })
    .then(handleError);

export const signInUser = async ({ email, password }: UserInfo) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return handleError({ data, error });
};

export const signOutUser = async () => await supabase.auth.signOut();

export const fetchUserName = async (
  userId: string | undefined,
): Promise<{
  user_name: string;
} | null> =>
  await supabase
    .from('users')
    .select('user_name')
    .eq('id', userId)
    .single()
    .then(handleError);

export const checkEmailExists = async (
  email: string | undefined,
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

export const refreshToken = async () => {
  const { data, error } = await supabase.auth.refreshSession();
  return handleError({ data: data.session, error });
};
