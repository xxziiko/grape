import { type ChatItemType, handleError } from '@/shared';
import { useQuery } from '@tanstack/react-query';
import { fetchUserChats } from '@/features/chat';

const useChatsQuery = (userId: string | undefined) => {
  const { error, ...rest } = useQuery({
    queryKey: ['chats', userId],
    queryFn: () => fetchUserChats(userId),
    enabled: !!userId,
    select: (data) =>
      data?.map(
        (chat): ChatItemType => ({
          chatId: chat.chatid,
          friendId: chat.friend_id,
          friendName: chat.friend_name,
          isNew: chat.isNew,
          latestMessage: {
            body: chat.latestmessage_body,
            created_at: chat.latest_message_created_at,
          },
        }),
      ),
  });

  return handleError({ data: rest, error });
};

export default useChatsQuery;
