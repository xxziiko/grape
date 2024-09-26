import { sessionAtom } from '@/entities/auth';
import { LoginForm, stepAtom } from '@/features/loginForm';
import { ProfileForm } from '@/features/profileForm';
import { PageLayout } from '@/shared';
import { Header } from '@/widgets';
import { useAtom } from 'jotai';
import { memo, useEffect } from 'react';

const LoginPage = () => {
  const [step, setStep] = useAtom(stepAtom);
  const [session] = useAtom(sessionAtom);

  const title =
    step === '로그인'
      ? '이메일로\n간편하게 가입해요'
      : '반가워요\n사용하실 이름을 작성해주세요';

  useEffect(() => {
    if (!session) setStep('로그인');
  }, [session]);

  // FIXME: 프로필 설정 페이지로 뺴기
  return (
    <PageLayout>
      <Header isBackIconVisible title={title} />
      {step === '로그인' && <LoginForm />}

      {step === '프로필설정' && <ProfileForm />}
    </PageLayout>
  );
};

export default memo(LoginPage);
