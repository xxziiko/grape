import * as stylex from '@stylexjs/stylex';
import { memo } from 'react';
import type { Friend } from '@/features/chat';
import { AvatarIcon, flexStyles } from '@/shared';
import { Skeleton } from '@radix-ui/themes';

const FriendListItem = ({
  data,
  isLoading,
}: {
  data: Friend;
  isLoading: boolean;
}) => {
  const { friendName } = data;

  return (
    <li {...stylex.props(flexStyles.alignCenter, styles.box)}>
      <AvatarIcon width={35} height={35} />

      <Skeleton loading={isLoading}>
        <div {...stylex.props(flexStyles.alignCenter, styles.contentBox)}>
          <p {...stylex.props(styles.name)}>{friendName}</p>
        </div>
      </Skeleton>
    </li>
  );
};

export default memo(FriendListItem);

const styles = stylex.create({
  box: {
    gap: '12px',
  },

  contentBox: {
    width: '100%',
    justifyContent: 'space-between',
  },

  name: {
    fontWeight: 600,
  },
});
