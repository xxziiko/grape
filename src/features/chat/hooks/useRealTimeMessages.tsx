import { type Messages, supabase } from '@/shared';
import { useEffect } from 'react';

const useRealTimeMessages = (
  chatId: string | undefined,
  setMessages: React.Dispatch<React.SetStateAction<Messages[]>>,
) => {
  useEffect(() => {
    if (!chatId) return;

    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `chat_id=eq.${chatId}`,
        },
        (payload) => {
          setMessages((prevMessages: Messages[]) => [
            ...prevMessages,
            payload.new as Messages,
          ]);
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [chatId, setMessages]);
};

export default useRealTimeMessages;
