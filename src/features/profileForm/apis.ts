import { handleError, supabase } from '@/shared';

export const updateUserName = async ({
  userName,
  userId,
}: {
  userName: string;
  userId: string | undefined;
}) => {
  return await supabase
    .from('users')
    .update({ user_name: userName })
    .eq('id', userId)
    .then(handleError);
};
