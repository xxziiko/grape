import { memo, useCallback } from 'react';
import { AvatarIcon, flexStyles, Title } from '@/shared';
import * as stylex from '@stylexjs/stylex';
import { Link } from '@tanstack/react-router';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Skeleton } from '@radix-ui/themes';
import {
  useChatInfoMutation,
  useMessages,
  type ChatItem,
} from '@/features/chat';

const ChatListItem = ({
  data,
  isLoading,
}: {
  data: ChatItem;
  isLoading: boolean;
}) => {
  const { friendName, isNew, latestMessage, chatId } = data;
  const { mutate } = useChatInfoMutation();
  const { refetch } = useMessages(chatId);

  const relativeTime = !latestMessage?.created_at
    ? ''
    : formatDistanceToNow(new Date(latestMessage.created_at), {
        addSuffix: true,
        locale: ko,
      });

  const handleChatClick = useCallback(() => {
    if (isNew) mutate(chatId);
    refetch();
  }, [mutate]);

  return (
    <Link
      to="/chat/$chatId"
      params={(prev) => ({ ...prev, chatId })}
      search={{ friendName: friendName }}
      onClick={handleChatClick}
    >
      <li {...stylex.props(flexStyles.alignCenter, styles.box)}>
        <AvatarIcon width={35} height={35} />

        <Skeleton loading={isLoading}>
          <div {...stylex.props(flexStyles.alignCenter, styles.contentBox)}>
            <div {...stylex.props(flexStyles.column, styles.fullWidthColumn)}>
              <p {...stylex.props(styles.name)}>{friendName}</p>
              {!latestMessage.body ? (
                <Title text="첫 대화를 시작해보세요!" style={styles.isRead} />
              ) : (
                <Title
                  text={latestMessage.body}
                  style={!isNew ? styles.isRead : styles.newMessage}
                />
              )}
            </div>

            <div>
              {!!latestMessage.created_at && (
                <Title text={relativeTime} style={!isNew && styles.isRead} />
              )}
            </div>
          </div>
        </Skeleton>
      </li>
    </Link>
  );
};

export default memo(ChatListItem);

const styles = stylex.create({
  fullWidthColumn: {
    gap: '10px',
    overflow: 'hidden',
    width: '100%',
  },

  box: {
    gap: '12px',
  },

  contentBox: {
    width: '100%',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },

  name: {
    fontWeight: 600,
  },

  isRead: {
    color: '#A3A3A3',
  },
  newMessage: {
    color: '000000',
    fontWeight: 600,
  },
});
