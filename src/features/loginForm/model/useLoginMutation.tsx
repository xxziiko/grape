import { signInUser, useAuth } from '@/entities/auth';
import { checkUserNameExists } from '@/features/loginForm';
import type { UserInfo } from '@/shared';

import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import type { UseFormSetError } from 'react-hook-form';

const useLoginMutation = (setError: UseFormSetError<UserInfo>) => {
  const navigate = useNavigate({ from: '/login' });
  const { setUserName, setSession } = useAuth();

  const { mutate, isError } = useMutation({
    mutationFn: signInUser,
    onSuccess: async (data) => {
      setSession(data.session);

      const userName = await checkUserNameExists(data?.user?.email);
      if (userName) {
        setUserName(userName);
        navigate({ to: '/chat' });
      }
    },
    onError: () => {
      setError('password', {
        type: 'manual',
        message: '비밀번호가 틀렸습니다',
      });
    },
  });

  return { mutate, isError };
};

export default useLoginMutation;
