import { handleError, queryClient } from '@/shared';
import { useMutation } from '@tanstack/react-query';
import { sendChatMessage } from '@/features/chat';

const useMessageMutation = ({ chatId }: { chatId: string | undefined }) => {
  const { mutate, isError } = useMutation({
    mutationFn: sendChatMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages', chatId] });
    },
    onError: (error) => handleError({ data: null, error }),
  });

  return { mutate, isError };
};

export default useMessageMutation;
