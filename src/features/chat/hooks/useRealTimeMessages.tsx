import { type Messages, supabase } from '@/shared';
import { useEffect } from 'react';

const useRealTimeMessages = (
  chatId: string | undefined,
  setMessages: React.Dispatch<React.SetStateAction<Messages[]>>,
  setRealtimeCount: React.Dispatch<React.SetStateAction<number>>,
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
          setMessages((prevData) => [...prevData, payload.new as Messages]);

          setRealtimeCount((prev) => prev + 1);
        },
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [chatId, setMessages]);
};

export default useRealTimeMessages;
