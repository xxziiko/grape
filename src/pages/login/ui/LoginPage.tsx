import { LoginForm } from '@/features/loginForm';
import { AuthLayout } from '@/shared';
import { memo } from 'react';

const LoginPage = () => {
  return (
    <AuthLayout
      component={<LoginForm />}
      title={'이메일로\n간편하게 가입해요'}
    />
  );
};

export default memo(LoginPage);
