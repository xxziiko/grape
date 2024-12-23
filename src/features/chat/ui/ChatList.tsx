import { memo, useEffect, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { useAtom } from 'jotai';
import { userIdAtom } from '@/entities/auth';
import {
  ChatListItem,
  NoData,
  useChatsQuery,
  useRealTimeChatList,
} from '@/features/chat';
import { PersonWithCheckIcon, styles } from '@/shared';

const ChatList = () => {
  const [userId] = useAtom(userIdAtom);
  const { data, isLoading, refetch } = useChatsQuery(userId);
  const [newChat, setNewChat] = useState();

  useRealTimeChatList((payload) => setNewChat(payload));

  useEffect(() => {
    if (newChat) refetch();
  }, [newChat]);

  // TODO: noSearchData UI
  return (
    <>
      {!isLoading && (
        <>
          {!data?.length && (
            <NoData
              icon={<PersonWithCheckIcon />}
              title="친구를 등록해 볼까요?"
              description={
                '닉네임이나 전화번호를 추가하면 \n 친구랑 대화할 수 있어요'
              }
            />
          )}
          <ul {...stylex.props(styles.list)}>
            {data
              ?.sort((a, b) => Number(b.isNew) - Number(a.isNew))
              .map((item) => (
                <ChatListItem
                  key={item.friendId}
                  data={item}
                  isLoading={isLoading}
                />
              ))}
          </ul>
        </>
      )}
    </>
  );
};

export default memo(ChatList);
