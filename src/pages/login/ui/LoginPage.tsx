import { LoginForm } from '@/features/loginForm';
import { PageLayout } from '@/shared';
import { Header } from '@/widgets/header';
import { memo } from 'react';

const LoginPage = () => {
  const title = (
    <>
      이메일로 <br />
      간편하게 가입해요
    </>
  );

  return (
    <PageLayout>
      <Header isBackIconVisible title={title} />
      <LoginForm />
    </PageLayout>
  );
};

export default memo(LoginPage);
