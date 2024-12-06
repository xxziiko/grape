import { type Messages, useMessagesQuery } from '@/features/chat';
import useRealTimeMessages from '@/features/chat/hooks/useRealTimeMessages';
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
  } = useMessagesQuery(chatId); // realtimeCount 제거

  useRealTimeMessages(chatId, (newMessage) => {
    setRealtimeMessages((prev) => [...prev, newMessage]);
    setRealtimeCount((prev) => prev + 1);
  });

  useEffect(() => {
    if (!data) return;

    // 메시지 정렬 및 중복 제거
    const allMessages = [...data, ...realtimeMessages].sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );

    const uniqueMessages = Array.from(
      new Map(allMessages.map((msg) => [msg.id, msg])).values(),
    );

    setMessages(uniqueMessages);
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
