import { handleError, NonNullable, supabase } from '@/shared';

export const updateUserName = async ({
  userName,
  userId,
}: {
  userName: string;
  userId: NonNullable<string>;
}) => {
  return await supabase
    .from('users')
    .update({ user_name: userName })
    .eq('id', userId)
    .then(handleError);
};
