import { supabase } from '@/shared';
import { useCallback, useEffect } from 'react';

const useRealTimeChatList = (onNewChat: (newChat: any) => void) => {
  const handleNewChat = useCallback(
    (payload: any) => {
      onNewChat(payload.new);
    },
    [onNewChat],
  );

  useEffect(() => {
    const channel = supabase
      .channel('chat_list_table')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'chat_list_table',
        },
        handleNewChat,
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [handleNewChat]);
};

export default useRealTimeChatList;
