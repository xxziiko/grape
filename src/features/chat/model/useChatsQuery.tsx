import { handleError } from '@/shared';
import { useQuery } from '@tanstack/react-query';
import { type ChatItem, fetchUserChats } from '@/features/chat';

const useChatsQuery = (userId: string | undefined) => {
  const { error, ...rest } = useQuery({
    queryKey: ['chats', userId],
    queryFn: () => fetchUserChats(userId),
    enabled: !!userId,
    select: (data) =>
      data?.map(
        (chat): ChatItem => ({
          chatId: chat.chat_id,
          friendId: chat.friend_id,
          friendName: chat.friend_name,
          isNew: chat.is_new,
          latestMessage: {
            body: chat.latest_message_body,
            created_at: chat.latest_message_created_time,
          },
        }),
      ),
  });

  return handleError({ data: rest, error });
};

export default useChatsQuery;
