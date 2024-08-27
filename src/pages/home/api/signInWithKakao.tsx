import { handleError, supabase } from '@/shared';

const signInWithKakao = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: `${location.origin}/auth/callback`,
    },
  });

  handleError(error);
};

export default signInWithKakao;
