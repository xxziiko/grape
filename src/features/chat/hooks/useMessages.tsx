import {
  type Message,
  useMessagesQuery,
  useMessageMutation,
} from '@/features/chat';
import useRealTimeMessages from '@/features/chat/hooks/useRealTimeMessages';
import { useEffect, useState } from 'react';
import { handleError, NonNullable } from '@/shared';
import { uniqueId } from 'es-toolkit/compat';

const useMessages = (chatId: NonNullable<string>) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const { mutate: mutateMessage } = useMessageMutation(chatId);
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useMessagesQuery(chatId);

  useRealTimeMessages(chatId, (newMessage) => {
    setMessages((prev) => {
      const updatedMessages = [...prev, newMessage];
      return Array.from(
        new Map(updatedMessages.map((msg) => [msg.id, msg])).values(),
      );
    });
  });

  const handleSendMessage = async (newMessage: Message) => {
    const clientMessage = { ...newMessage, id: uniqueId('userId_') };
    setMessages((prev) => [...prev, clientMessage]);

    try {
      await mutateMessage(newMessage);
    } catch (error) {
      setMessages((prev) => prev.filter((msg) => msg.id !== newMessage.id));
      handleError({ data: null, error });
    }
  };

  useEffect(() => {
    if (!data) return;
    const uniqueMessages = Array.from(
      new Map([...data, ...messages].map((msg) => [msg.id, msg])).values(),
    );
    setMessages(uniqueMessages);
  }, [data]);

  return {
    messages,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    handleSendMessage,
  };
};

export default useMessages;
