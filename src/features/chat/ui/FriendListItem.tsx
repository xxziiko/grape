import { PersonIcon } from '@radix-ui/react-icons';
import * as stylex from '@stylexjs/stylex';
import { Avatar } from 'antd';
import { memo } from 'react';
import type { Friend } from '@/features/chat';

const FriendListItem = ({ data }: { data: Friend }) => {
  const { friendName } = data;

  return (
    <li {...stylex.props(styles.flexCenter, styles.box)}>
      <div>
        <Avatar size={50} icon={<PersonIcon width={30} height={30} />} />
      </div>

      <div {...stylex.props(styles.flexCenter, styles.contentBox)}>
        <p {...stylex.props(styles.name)}>{friendName}</p>
      </div>
    </li>
  );
};

export default memo(FriendListItem);

const styles = stylex.create({
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
  },

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
