import { handleError, supabase } from '@/shared';

const signInWithKakao = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao'
  });

  handleError(error);
};

export default signInWithKakao;
