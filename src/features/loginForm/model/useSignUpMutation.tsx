import { sessionAtom, signUpUser } from '@/entities/auth';
import { handleError } from '@/shared';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { useAtom } from 'jotai';

const useSignUpMutation = () => {
  const navigate = useNavigate({ from: '/login' });
  const [, setSession] = useAtom(sessionAtom);

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
