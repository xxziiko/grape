import { fetchUserName, sessionAtom, signInUser } from '@/entities/auth';
import { handleError, type UserInfo } from '@/shared';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import type { UseFormSetError } from 'react-hook-form';
import { useAtom } from 'jotai';

const useLoginMutation = (setError: UseFormSetError<UserInfo>) => {
  const [, setSession] = useAtom(sessionAtom);

  const navigate = useNavigate();

  const { mutate, isError } = useMutation({
    mutationFn: signInUser,
    onSuccess: async (data) => {
      setSession(data.session);
      const query = await fetchUserName(data.user?.id);

      if (query?.user_name) navigate({ to: '/chat' });
      else navigate({ to: '/login/profile-setup' });
    },
    onError: (error) => {
      setError('password', {
        type: 'manual',
        message: '비밀번호를 확인해주세요',
      });
      handleError({ data: null, error });
    },
  });

  return { mutate, isError };
};

export default useLoginMutation;
