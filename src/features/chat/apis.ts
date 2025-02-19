import { handleError, NonNullable, supabase } from '@/shared';
import type { RawChat, RawFriend, Message } from './types';

export const fetchUserChats = async (userId: NonNullable<string>) =>
  (await supabase
    .from('chat_list_table')
    .select('*')
    .eq('user_id', userId)
    .then(handleError)) as RawChat[];

export const fetchUserFriends = async (userId: NonNullable<string>) =>
  (await supabase
    .from('friends')
    .select('friend_id, friend_name')
    .eq('user_id', userId)
    .then(handleError)) as RawFriend[];

export const sendChatMessage = async ({ chat_id, user_id, body }: Message) =>
  await supabase
    .from('messages')
    .insert([{ chat_id, user_id, body }])
    .then(handleError);

export const updateChatStatus = async (chatId: NonNullable<string>) =>
  await supabase
    .from('chat_list_table')
    .update({ is_new: false })
    .eq('chat_id', chatId)
    .then(handleError);
