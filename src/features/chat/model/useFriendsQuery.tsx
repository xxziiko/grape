import { fetchUserFriends, RawFriend, type Friend } from '@/features/chat';
import { handleError, NonNullable } from '@/shared';
import { useQuery } from '@tanstack/react-query';

const useFriendsQuery = (userId: NonNullable<string>) => {
  const { error, ...rest } = useQuery<RawFriend[], unknown, Friend[]>({
    queryKey: ['friends', userId],
    queryFn: () => fetchUserFriends(userId),
    select: (data) =>
      data.map((user) => {
        return {
          id: user.friend_id,
          friendName: user.friend_name,
        };
      }),
    enabled: !!userId,
  });

  return handleError({ data: rest, error });
};

export default useFriendsQuery;
