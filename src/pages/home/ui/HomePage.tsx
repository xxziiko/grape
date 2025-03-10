import { GREETINGMESSAGES, signInWithKakao } from '@/pages/home';
import {
  Bubble,
  ButtonBoxLayout,
  DefaultButton,
  flexStyles,
  KakaoIcon,
  PageLayout,
} from '@/shared';
import { Header } from '@/widgets';
import * as stylex from '@stylexjs/stylex';
import { useNavigate } from '@tanstack/react-router';
import { memo } from 'react';

const HomePage = () => {
  const navigate = useNavigate({ from: '/' });
  const goToLogin = () => navigate({ to: '/login' });

  return (
    <PageLayout style={styles.gradientBackground}>
      <Header />
      <main {...stylex.props(flexStyles.column, styles.main)}>
        {GREETINGMESSAGES?.map((el) => <Bubble key={el.id} data={el} />)}

        <div>
          <h2 {...stylex.props(styles.text)}>안녕하세요!</h2>
          <p {...stylex.props(styles.text)}>
            {'grape에 오신걸 환영합니다\n지금 채팅을 시작해보세요!'}
          </p>
        </div>
      </main>

      <ButtonBoxLayout>
        <DefaultButton
          command="카카오 로그인"
          variant="kakao"
          icon={<KakaoIcon />}
          onClick={signInWithKakao}
        />
        <DefaultButton command="이메일로 시작하기" onClick={goToLogin} />
      </ButtonBoxLayout>
    </PageLayout>
  );
};

export default memo(HomePage);

const styles = stylex.create({
  borderRadius: {
    borderRadius: '12px',
  },

  gradientBackground: {
    background:
      'linear-gradient(to bottom,#CFBBDF, rgba(220, 201, 235, 0.4), rgba(220, 201, 235, 0.2))',
  },

  main: {
    gap: '20px',
    height: '100%',
  },

  text: {
    whiteSpace: 'pre',
    color: '#4A4545',
  },
});
