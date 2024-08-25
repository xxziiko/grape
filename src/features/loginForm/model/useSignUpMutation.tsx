import { signUpUser, useAuth } from '@/entities/auth';
import { checkUserNameExists } from '@/features/loginForm';
import { useMutation } from '@tanstack/react-query';

const useSignUpMutation = () => {
  const { setSession, setUserName } = useAuth();
  const { mutate, isError } = useMutation({
    mutationFn: signUpUser,
    onSuccess: async (data) => {
      setSession(data.session);

      const userName = await checkUserNameExists(data?.user?.email);
      if (userName) setUserName(userName);
    },
  });

  return { mutate, isError };
};

export default useSignUpMutation;
