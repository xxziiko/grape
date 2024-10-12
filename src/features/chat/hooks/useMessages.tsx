import { useMessagesQuery } from '@/features/chat';
import useRealTimeMessages from '@/features/chat/hooks/useRealTimeMessages';
import type { Messages } from '@/shared';
import { useEffect, useState } from 'react';

const useMessages = (chatId: string | undefined) => {
  useRealTimeMessages(chatId, (newMessage: React.SetStateAction<Messages[]>) =>
    setMessages(newMessage),
  );
  const { data, isLoading } = useMessagesQuery(chatId);
  const [messages, setMessages] = useState<Messages[]>([]);

  useEffect(() => {
    setMessages(data!);
  }, [data]);

  return { messages, isLoading };
};

export default useMessages;
