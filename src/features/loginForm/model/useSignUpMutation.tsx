import { signUpUser } from '@/entities/auth';
import { handleError } from '@/shared';
import { useMutation } from '@tanstack/react-query';
import { stepAtom } from '../atoms';
import { useAtom } from 'jotai';

const useSignUpMutation = () => {
  const [, setStep] = useAtom(stepAtom);

  const { mutate, isError } = useMutation({
    mutationFn: signUpUser,
    onSuccess: () => {
      setStep('프로필설정');
    },
    onError: (error) => handleError({ data: null, error }),
  });

  return { mutate, isError };
};

export default useSignUpMutation;
