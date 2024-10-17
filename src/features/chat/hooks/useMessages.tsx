import { useMessagesQuery } from '@/features/chat';
import useRealTimeMessages from '@/features/chat/hooks/useRealTimeMessages';
import type { Messages } from '@/shared';
import { useEffect, useState } from 'react';

const useMessages = (chatId: string | undefined) => {
  const { data, isLoading } = useMessagesQuery(chatId);
  const [messages, setMessages] = useState<Messages[]>([]);
  useRealTimeMessages(chatId, setMessages);

  useEffect(() => {
    if (data) {
      const allMessages = data.pages.flat().reverse();
      setMessages(allMessages);
    }
  }, [data]);

  return { messages, isLoading };
};

export default useMessages;
