import { useAuth } from '@/entities/auth';
import { LoginForm } from '@/features/loginForm';
import { ProfileForm } from '@/features/profileForm';
import { PageLayout } from '@/shared';
import { Header } from '@/widgets';
import { memo, useEffect, useState } from 'react';

const LoginPage = () => {
  const [step, setStep] = useState<'로그인' | '프로필설정'>('로그인');
  const { userName, session } = useAuth();

  const title =
    step === '로그인'
      ? '이메일로\n간편하게 가입해요'
      : '반가워요\n사용하실 이름을 작성해주세요';

  useEffect(() => {
    if (!userName && session) setStep('프로필설정');
  }, [userName, session]);

  return (
    <PageLayout>
      <Header isBackIconVisible title={title} />
      {step === '로그인' && <LoginForm />}

      {step === '프로필설정' && <ProfileForm />}
    </PageLayout>
  );
};

export default memo(LoginPage);
