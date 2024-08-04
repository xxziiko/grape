import { LoginForm } from '@/features/loginForm';
import { PageLayout } from '@/shared';
import { Header } from '@/widgets/header';
import * as stylex from '@stylexjs/stylex';
import { memo } from 'react';

const LoginPage = () => {
  const title = (
    <p {...stylex.props(styles.title)}>
      이메일로 {'\n'}
      간편하게 가입해요
    </p>
  );

  return (
    <PageLayout>
      <Header isBackIconVisible title={title} />
      <LoginForm />
    </PageLayout>
  );
};

export default memo(LoginPage);

const styles = stylex.create({
  title: {
    whiteSpace: 'pre',
  },
});
