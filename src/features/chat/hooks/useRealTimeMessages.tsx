import { supabase } from '@/shared';
import { useEffect, useCallback } from 'react';
import type { Messages } from '@/features/chat';

const useRealTimeMessages = (
  chatId: string | undefined,
  onNewMessage: (message: Messages) => void,
) => {
  const handleNewMessage = useCallback(
    (payload: { new: Messages }) => {
      onNewMessage(payload.new);
    },
    [onNewMessage],
  );

  useEffect(() => {
    if (!chatId) return;

    const channel = supabase
      .channel(`messages-${chatId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `chat_id=eq.${chatId}`,
        },
        handleNewMessage,
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [chatId, handleNewMessage]);
};

export default useRealTimeMessages;
