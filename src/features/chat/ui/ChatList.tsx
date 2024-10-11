import { userIdAtom } from '@/entities/auth';
import { ChatListItem, useChatsQuery } from '@/features/chat';
import * as stylex from '@stylexjs/stylex';
import { useAtom } from 'jotai';
import { memo } from 'react';

const ChatList = () => {
  const [userId] = useAtom(userIdAtom);
  const { data, isLoading } = useChatsQuery(userId!);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div {...stylex.props(styles.list)}>
      {data
        ?.sort((a, b) => Number(b.isNew) - Number(a.isNew))
        .map((item) => <ChatListItem key={item.friendId} data={item} />)}
    </div>
  );
};

export default memo(ChatList);

const styles = stylex.create({
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
});
