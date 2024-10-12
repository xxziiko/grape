import { useSession, signUpUser } from '@/entities/auth';
import { handleError } from '@/shared';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

const useSignUpMutation = () => {
  const { setSession } = useSession();
  const navigate = useNavigate({ from: '/login' });

  const { mutate, isError } = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      setSession(data.session);
      navigate({ to: '/login/profile-setup' });
    },
    onError: (error) => handleError({ data: null, error }),
  });

  return { mutate, isError };
};

export default useSignUpMutation;
