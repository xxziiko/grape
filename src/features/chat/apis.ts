import { handleError, supabase } from '@/shared';

type MessageBodyType = {
  chat_id: string | undefined;
  user_id: string;
  body: string;
};

export const fetchMessagesForChat = async (chatId: string | undefined) =>
  supabase
    .from('messages')
    .select('*')
    .eq('chat_id', chatId)
    .order('created_at', { ascending: true })
    .then(handleError);

export const fetchUserChats = async (userId: string | null) =>
  supabase
    .from('chat_list_view')
    .select('*')
    .eq('user_id', userId)
    .then(handleError);

export const fetchUserFriends = async (userId: string | null) =>
  supabase
    .from('friends')
    .select('friend_id, friend_name')
    .eq('user_id', userId)
    .then(handleError);

export const sendChatMessage = async ({
  chat_id,
  user_id,
  body,
}: MessageBodyType) =>
  supabase
    .from('messages')
    .insert([{ chat_id, user_id, body }])
    .then(handleError);
