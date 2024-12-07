import { handleError, supabase } from '@/shared';
import { useInfiniteQuery } from '@tanstack/react-query';

const PAGE_SIZE = 20;

const useMessagesQuery = (chatId: string | undefined) => {
  const { error, ...rest } = useInfiniteQuery({
    queryKey: ['messages', chatId],
    queryFn: async ({ pageParam = 0 }) => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: false })
        .range(pageParam * PAGE_SIZE, (pageParam + 1) * PAGE_SIZE - 1);

      if (error) throw error;
      return data || [];
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PAGE_SIZE ? allPages.length : undefined,
    select: (data) => data.pages.flat().reverse(),
    enabled: !!chatId,
    initialPageParam: 0,
    staleTime: 1000 * 60,
    gcTime: 1000 * 60 * 5,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  return handleError({ data: rest, error });
};

export default useMessagesQuery;
