import { userIdAtom } from '@/entities/auth';
import {
  useIntersectionObserver,
  useMessageMutation,
  useMessages,
} from '@/features/chat';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import * as stylex from '@stylexjs/stylex';
import { useLocation, useParams, useRouter } from '@tanstack/react-router';
import { Input } from 'antd';
import { useAtom } from 'jotai';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type SendMessage = {
  newMessage: string;
};

const ChatRoom = () => {
  const router = useRouter();
  const location = useLocation();
  const { chatId } = useParams({ strict: false });

  const { handleSubmit, reset, control } = useForm<SendMessage>();
  const chatRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLLIElement | null>(null);
  const [userId] = useAtom(userIdAtom);
  const [autoScroll, setAutoScroll] = useState(true);
  const prevScrollHeight = useRef(0);

  const queryParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  const friendName = useMemo(
    () => queryParams.get('friendName') || '',
    [queryParams],
  );

  const { messages, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMessages(chatId);

  const { mutate } = useMessageMutation();
  const [scrollPosition, setScrollPosition] = useState<number | null>(null);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setAutoScroll(isNearBottom);
  }, []);

  useEffect(() => {
    if (!chatRef.current?.parentElement) return;
    const chatContainer = chatRef.current.parentElement;

    if (scrollPosition !== null) {
      // 이전 메시지 로드 시 스크롤 위치 유지
      const scrollDiff = chatContainer.scrollHeight - prevScrollHeight.current;
      chatContainer.scrollTop = scrollPosition + scrollDiff;
      setScrollPosition(null);
    } else if (autoScroll) {
      // 새 메시지 도착 시 자동 스크롤
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    prevScrollHeight.current = chatContainer.scrollHeight;
  }, [messages, scrollPosition, autoScroll]);

  const observe = useIntersectionObserver(
    () => {
      if (
        !isFetchingNextPage &&
        hasNextPage &&
        chatRef.current?.parentElement
      ) {
        setScrollPosition(chatRef.current.parentElement.scrollTop);
        fetchNextPage();
      }
    },
    { threshold: 0.5 },
  );

  const SendMessages: SubmitHandler<SendMessage> = useCallback(
    async (data: SendMessage) => {
      if (!userId || !data.newMessage.trim()) return;

      mutate({
        chat_id: chatId,
        user_id: userId,
        body: data.newMessage,
      });
      reset();
    },
    [chatId, userId, mutate, reset],
  );

  useEffect(() => {
    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observe(currentRef);
      return () => observe(currentRef);
    }
  }, [observe]);

  return (
    <div {...stylex.props(styles.box)}>
      <div {...stylex.props(styles.flex, styles.bottomGrey)}>
        <ChevronLeftIcon
          width={30}
          height={30}
          cursor={'pointer'}
          onClick={() => router.history.back()}
        />
        <div {...stylex.props(styles.center, styles.flex)}>
          <h3>{friendName}</h3>
        </div>
      </div>

      <main {...stylex.props(styles.main)} onScroll={handleScroll}>
        <ul {...stylex.props(styles.ul)}>
          {/** TODO: UI 수정*/}

          {messages?.map((message, i) =>
            i === 10 ? (
              <li
                ref={loadMoreRef}
                {...stylex.props(
                  styles.list,
                  message.user_id === userId ? styles.user : styles.friend,
                )}
                key={message.id}
              >
                {message.body}
              </li>
            ) : (
              <li
                {...stylex.props(
                  styles.list,
                  message.user_id === userId ? styles.user : styles.friend,
                )}
                key={message.id}
              >
                {message.body}
              </li>
            ),
          )}
        </ul>
        <div ref={chatRef} />
      </main>

      <form
        onSubmit={handleSubmit(SendMessages)}
        {...stylex.props(styles.form)}
      >
        <Controller
          name="newMessage"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              styles={{
                input: {
                  padding: '15px',
                  border: 'none',
                  borderRadius: '26px',
                  backgroundColor: 'rgba(220, 201, 235, 0.2)',
                },
              }}
              type="text"
            />
          )}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
export default memo(ChatRoom);

const styles = stylex.create({
  box: {
    height: '100%',
    overflow: 'hidden',
  },

  flex: {
    display: 'flex',
    alignItems: 'center',
  },

  bottomGrey: {
    padding: '24px',
    border: '1px solid #dedede',
  },

  main: {
    padding: '0 24px',
    height: '80%',
    overflow: 'auto',
  },

  ul: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },

  center: {
    width: '100%',
    justifyContent: 'center',
  },

  list: {
    width: 'fit-content',
    padding: '10px 15px',
    borderRadius: '30px',
    overflowWrap: 'break-word',
  },

  user: {
    marginLeft: 'auto',
    backgroundColor: '#FEFEFF',
    border: '1px solid #DCC9EB',
  },

  friend: {
    backgroundColor: '#DCC9EB',
  },

  form: {
    display: 'flex',
    gap: '10px',
    padding: '15px 10px',
  },
});
