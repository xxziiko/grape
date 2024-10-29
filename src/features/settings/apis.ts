import { handleError, supabase } from '@/shared';

export const changePassword = async (password: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  return handleError({ data, error });
};
