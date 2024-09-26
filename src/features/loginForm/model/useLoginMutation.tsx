import { sessionAtom, signInUser, userNameQueryAtom } from '@/entities/auth';
import { type UserInfo } from '@/shared';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import type { UseFormSetError } from 'react-hook-form';
import { useAtom } from 'jotai';
import { stepAtom } from '../atoms';

const useLoginMutation = (setError: UseFormSetError<UserInfo>) => {
  const navigate = useNavigate({ from: '/login' });
  const [userNameQuery] = useAtom(userNameQueryAtom);
  const [, setSession] = useAtom(sessionAtom);
  const [, setStep] = useAtom(stepAtom);

  const { mutate, isError } = useMutation({
    mutationFn: signInUser,
    onSuccess: (data) => {
      setSession(data.session);

      if (userNameQuery.data) {
        navigate({ to: '/chat' });
      } else setStep('프로필설정');
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
