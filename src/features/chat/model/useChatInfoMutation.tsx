import { useMutation } from '@tanstack/react-query';
import { updateChatStatus } from '../apis';

const useChatInfoMutation = () => {
  const { mutate, isError } = useMutation({
    mutationFn: updateChatStatus,
  });

  return { mutate, isError };
};

export default useChatInfoMutation;
