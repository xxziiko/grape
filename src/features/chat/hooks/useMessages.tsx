import { useMessagesQuery } from '@/features/chat';
import useRealTimeMessages from '@/features/chat/hooks/useRealTimeMessages';
import type { Messages } from '@/shared';
import { useEffect, useState } from 'react';

const useMessages = (chatId: string | undefined) => {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [realtimeMessages, setRealtimeMessages] = useState<Messages[]>([]);
  const [realtimeCount, setRealtimeCount] = useState(0);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useMessagesQuery(chatId, realtimeCount);

  useRealTimeMessages(chatId, setRealtimeMessages, setRealtimeCount);

  useEffect(() => {
    if (data) {
      const mergedMessages = [...data, ...realtimeMessages];
      setMessages(mergedMessages);
    }
  }, [data, realtimeMessages]);

  return {
    messages,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    realtimeCount,
    refetch,
  };
};

export default useMessages;
