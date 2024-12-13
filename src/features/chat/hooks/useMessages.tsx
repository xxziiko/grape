import { type Messages, useMessagesQuery } from '@/features/chat';
import useRealTimeMessages from '@/features/chat/hooks/useRealTimeMessages';
import { useEffect, useState } from 'react';
import { debounce } from 'es-toolkit';

const useMessages = (chatId: string | undefined) => {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [realtimeMessages, setRealtimeMessages] = useState<Messages[]>([]);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useMessagesQuery(chatId);

  const updateMessages = debounce((newMessages: Messages[]) => {
    setRealtimeMessages((prev) => [...prev, ...newMessages]);
  }, 300);

  useRealTimeMessages(chatId, (newMessage) => {
    updateMessages([newMessage]);
  });

  useEffect(() => {
    if (!data) return;

    const allMessages = [...data, ...realtimeMessages].sort(
      (a, b) =>
        new Date(a.created_at ?? '0').getTime() -
        new Date(b.created_at ?? '0').getTime(),
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
    refetch,
  };
};

export default useMessages;
