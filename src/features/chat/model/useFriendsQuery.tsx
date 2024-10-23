import { fetchUserFriends, type Friend } from '@/features/chat';
import { handleError } from '@/shared';
import { useQuery } from '@tanstack/react-query';

const useFriendsQuery = (userId: string | undefined) => {
  const { error, ...rest } = useQuery({
    queryKey: ['friends', userId],
    queryFn: () => fetchUserFriends(userId),
    select: (data) =>
      data?.map((user): Friend => {
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
