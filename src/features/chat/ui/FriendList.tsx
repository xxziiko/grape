import { userIdAtom } from '@/entities/auth';
import { FriendListItem, NoData, useFriendsQuery } from '@/features/chat';
import { PersonWithCheckIcon, commonStyles } from '@/shared';
import * as stylex from '@stylexjs/stylex';
import { useAtom } from 'jotai';
import { memo } from 'react';

const FriendList = () => {
  const [userId] = useAtom(userIdAtom);
  const { data, isLoading } = useFriendsQuery(userId);

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
          <ul {...stylex.props(commonStyles.listContainer)}>
            {data
              ?.sort((a, b) => a.friendName.localeCompare(b.friendName))
              .map((item) => (
                <FriendListItem
                  key={item.id}
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

export default memo(FriendList);
