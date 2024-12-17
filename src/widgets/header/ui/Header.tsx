import Modal from '@/shared/ui/components/Modal';
import { ChevronLeftIcon, PlusIcon } from '@radix-ui/react-icons';
import { IconButton } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';
import { useRouter } from '@tanstack/react-router';
import { memo } from 'react';

type HeaderProps = {
  isBackIconVisible?: boolean;
  isPlusIconVisible?: boolean;
  title?: React.ReactNode;
  path?: string;
};

const Header = (props: HeaderProps) => {
  const router = useRouter();
  const { isBackIconVisible = false, isPlusIconVisible = false, title } = props;

  const onBack = () => router.history.back();

  return (
    <div {...stylex.props(styles.box)}>
      <div {...stylex.props(styles.icons)}>
        <div>
          {isBackIconVisible && (
            <ChevronLeftIcon
              width={30}
              height={30}
              cursor={'pointer'}
              onClick={onBack}
            />
          )}
        </div>

        {isPlusIconVisible && (
          <Modal
            title="친구 추가"
            description="등록하실 친구이름을 입력해주세요"
            command="취소"
            triggerButton={
              <IconButton
                variant="ghost"
                radius="full"
                color="gray"
                highContrast
              >
                <PlusIcon
                  width={30}
                  height={30}
                  cursor={'pointer'}
                  color="#9e9e9e"
                />
              </IconButton>
            }
          />
        )}
      </div>

      {title && <div {...stylex.props(styles.text)}>{title}</div>}
    </div>
  );
};

export default memo(Header);

const styles = stylex.create({
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '20px',
    minHeight: '170px',
  },

  text: {
    fontSize: '20px',
    fontWeight: 600,
    whiteSpace: 'pre',
  },

  icons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});
