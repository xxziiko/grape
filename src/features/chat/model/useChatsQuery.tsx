import { handleError, NonNullable } from '@/shared';
import { useQuery } from '@tanstack/react-query';
import { type ChatItem, type RawChat, fetchUserChats } from '@/features/chat';

const useChatsQuery = (userId: NonNullable<string>) => {
  const { error, ...rest } = useQuery<RawChat[], unknown, ChatItem[]>({
    queryKey: ['chats', userId],
    queryFn: () => fetchUserChats(userId),
    enabled: !!userId,
    select: (data) =>
      data.map((chat) => ({
        chatId: chat.chat_id,
        friendId: chat.friend_id,
        friendName: chat.friend_name,
        isNew: chat.is_new,
        latestMessage: {
          body: chat.latest_message_body,
          created_at: chat.latest_message_created_time,
        },
      })),
  });

  return handleError({ data: rest, error });
};

export default useChatsQuery;
