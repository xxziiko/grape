import { memo } from 'react';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import * as stylex from '@stylexjs/stylex';
import { useRouter } from '@tanstack/react-router';
import { AddFriendIconButton } from '@/features/chat';
import { flexStyles } from '@/shared';

type HeaderProps = {
  isBackIconVisible?: boolean;
  isPlusIconVisible?: boolean;
  title?: React.ReactNode;
};

const Header = (props: HeaderProps) => {
  const router = useRouter();
  const { isBackIconVisible = false, isPlusIconVisible = false, title } = props;

  const onBack = () => router.history.back();

  return (
    <div {...stylex.props(flexStyles.column, styles.box)}>
      <div {...stylex.props(flexStyles.spaceBetween)}>
        {isBackIconVisible && (
          <ChevronLeftIcon
            width={30}
            height={30}
            cursor={'pointer'}
            onClick={onBack}
          />
        )}

        {isPlusIconVisible && <AddFriendIconButton />}
      </div>

      {title && <div {...stylex.props(styles.text)}>{title}</div>}
    </div>
  );
};

export default memo(Header);

const styles = stylex.create({
  box: {
    justifyContent: 'center',
    gap: '20px',
    minHeight: '170px',
  },

  text: {
    fontSize: '20px',
    fontWeight: 600,
    whiteSpace: 'pre',
  },
});
