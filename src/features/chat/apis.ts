import { handleError, supabase } from '@/shared';
import type { Messages } from './types';

export const fetchUserChats = async (userId: string | undefined) =>
  await supabase
    .from('chat_list_table')
    .select('*')
    .eq('user_id', userId)
    .then(handleError);

export const fetchUserFriends = async (userId: string | undefined) =>
  await supabase
    .from('friends')
    .select('friend_id, friend_name')
    .eq('user_id', userId)
    .then(handleError);

export const sendChatMessage = async ({ chat_id, user_id, body }: Messages) =>
  await supabase
    .from('messages')
    .insert([{ chat_id, user_id, body }])
    .then(handleError);

export const updateChatStatus = async ({
  chatId,
}: {
  chatId: string | undefined;
}) =>
  await supabase
    .from('chat_list_table')
    .update({ is_new: false })
    .eq('chat_id', chatId)
    .then(handleError);
