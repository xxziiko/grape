import { type Messages, useMessagesQuery } from '@/features/chat';
import useRealTimeMessages from '@/features/chat/hooks/useRealTimeMessages';
import { useEffect, useState } from 'react';
import { NonNullable } from '@/shared';

const useMessages = (chatId: NonNullable<string>) => {
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

  const updateMessages = (newMessages: Messages[]) => {
    setRealtimeMessages((prev) => [...prev, ...newMessages]);
  };

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
