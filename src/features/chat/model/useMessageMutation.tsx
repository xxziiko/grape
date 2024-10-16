import { handleError } from '@/shared';
import { useMutation } from '@tanstack/react-query';
import { sendChatMessage } from '@/features/chat';

const useMessageMutation = () => {
  const { mutate, isError } = useMutation({
    mutationFn: sendChatMessage,
    onError: (error) => handleError({ data: null, error }),
  });

  return { mutate, isError };
};

export default useMessageMutation;
