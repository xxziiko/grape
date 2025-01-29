import {
  ButtonBoxLayout,
  DefaultButton,
  PageLayout,
  commonStyles,
  textStyles,
} from '@/shared';
import { useNavigate } from '@tanstack/react-router';
import * as stylex from '@stylexjs/stylex';
import { EyeNoneIcon } from '@radix-ui/react-icons';

const Error = ({ onClick }: { onClick?: () => void }) => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <main {...stylex.props(commonStyles.centerColumn)}>
        <EyeNoneIcon width={30} height={30} />
        <h2>오류가 발생했어요</h2>
        <p {...stylex.props(textStyles.base)}>
          서비스 이용에 불편을 드려서 죄송합니다. <br /> 더 나은 서비스를 위해
          노력하겠습니다.
        </p>
      </main>
      <ButtonBoxLayout>
        <DefaultButton
          command="다시 시도하기"
          styleType="error"
          onClick={onClick}
        />

        <DefaultButton
          command="홈으로 돌아기기"
          onClick={() => navigate({ to: '/' })}
        />
      </ButtonBoxLayout>
    </PageLayout>
  );
};

export default Error;
