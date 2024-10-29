import { handleError } from '@/shared';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { changePassword } from '../apis';

const usePasswordMutation = () => {
  const navigate = useNavigate();

  const { mutate, isError } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      navigate({ to: '/chat' });
    },
    onError: (error) => handleError({ data: null, error }),
  });

  return { mutate, isError };
};

export default usePasswordMutation;
