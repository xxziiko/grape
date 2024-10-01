import { fetchUserFriends } from "@/features/chat";
import { type FriendType, handleError } from "@/shared";
import { useQuery } from "@tanstack/react-query";

const useFriendsQuery = (userId: string | null) => {
  const { error, ...rest } = useQuery({
    queryKey: ["friends", userId],
    queryFn: () => fetchUserFriends(userId),
    select: (data) =>
      data?.map((user): FriendType => {
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
