import { handleError, queryClient, supabase } from '@/shared';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const useMessagesQuery = (
  chatId: string | undefined,
  realtimeCount: number,
) => {
  const { error, ...rest } = useInfiniteQuery({
    queryKey: ['messages', chatId],
    queryFn: async ({ pageParam }) => {
      const start = pageParam * 20 + realtimeCount;
      const end = (pageParam + 1) * 20 - 1;

      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: false })
        .range(start, end);

      return data || [];
    },
    getNextPageParam: (lastPage, _, lastPageParams) => {
      return lastPage.length < 20 ? null : (lastPageParams as number) + 1;
    },

    select: (data) => {
      return data.pages.flat().reverse();
    },

    enabled: !!chatId,
    initialPageParam: 0,
  });

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ['messages', chatId] });
    };
  }, []);

  return handleError({ data: rest, error });
};

export default useMessagesQuery;
