import { userIdAtom } from '@/entities/auth';
import {
  useChatInfoMutation,
  useIntersectionObserver,
  useMessageMutation,
  useMessages,
} from '@/features/chat';
import { flexStyles } from '@/shared';
import { ChevronLeftIcon, PaperPlaneIcon } from '@radix-ui/react-icons';
import { IconButton, TextField } from '@radix-ui/themes';
import * as stylex from '@stylexjs/stylex';
import { useLocation, useParams, useRouter } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type SendMessage = {
  newMessage: string;
};

const ChatRoom = () => {
  const router = useRouter();
  const location = useLocation();
  const chatId = useParams({ strict: false }).chatId as string;
  const prevScrollHeight = useRef(0);
  const chatRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLLIElement | null>(null);

  const { handleSubmit, reset, control } = useForm<SendMessage>({
    defaultValues: {
      newMessage: '',
    },
  });
  const [userId] = useAtom(userIdAtom);

  const [autoScroll, setAutoScroll] = useState(true);
  const [scrollPosition, setScrollPosition] = useState<number | null>(null);

  const { messages, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useMessages(chatId);
  const { mutate: mutateMessage } = useMessageMutation(chatId);
  const { mutate: mutateIsNew } = useChatInfoMutation();

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

  const queryParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );

  const friendName = useMemo(
    () => queryParams.get('friendName') ?? '',
    [queryParams],
  );

  const handleIconButton = useCallback(() => {
    router.history.back();
    mutateIsNew(chatId!);
  }, [router.history, mutateIsNew]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    setAutoScroll(isNearBottom);
  }, []);

  const SendMessages: SubmitHandler<SendMessage> = useCallback(
    async (data: SendMessage) => {
      if (!userId || !data.newMessage.trim()) return;

      mutateMessage({
        chat_id: chatId!,
        user_id: userId,
        body: data.newMessage,
      });
      reset();
    },
    [chatId, userId, mutateMessage, reset],
  );

  useEffect(() => {
    if (!chatRef.current?.parentElement) return;
    const chatContainer = chatRef.current.parentElement;

    if (scrollPosition !== null) {
      // 이전 메시지 로드 시 스크롤 위치 유지
      const scrollDiff = chatContainer.scrollHeight - prevScrollHeight.current;
      chatContainer.scrollTop = scrollPosition + scrollDiff;
      setScrollPosition(null);
    }

    if (autoScroll) {
      // 새 메시지 도착 시 자동 스크롤
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    prevScrollHeight.current = chatContainer.scrollHeight;
  }, [messages, scrollPosition, autoScroll]);

  useEffect(() => {
    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observe(currentRef);
      return () => observe(currentRef);
    }
  }, [observe]);

  return (
    <div {...stylex.props(styles.box)}>
      <div {...stylex.props(flexStyles.alignCenter, styles.bottomGrey)}>
        <ChevronLeftIcon
          width={30}
          height={30}
          cursor={'pointer'}
          onClick={handleIconButton}
        />
        <div {...stylex.props(styles.center, flexStyles.alignCenter)}>
          <h3>{friendName}</h3>
        </div>
      </div>

      <main {...stylex.props(styles.main)} onScroll={handleScroll}>
        <ul {...stylex.props(flexStyles.column, styles.ul)}>
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
            <TextField.Root
              {...field}
              variant="soft"
              size={'2'}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '26px',
                backgroundColor: 'rgba(220, 201, 235, 0.2)',
              }}
              type="text"
              autoComplete="off"
            >
              <TextField.Slot />
              <TextField.Slot>
                <IconButton
                  type="submit"
                  variant="ghost"
                  radius="full"
                  color="gray"
                >
                  <PaperPlaneIcon {...stylex.props(styles.button)} />
                </IconButton>
              </TextField.Slot>
            </TextField.Root>
          )}
        />
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

  bottomGrey: {
    padding: '24px',
    border: '1px solid #dedede',
  },

  main: {
    padding: '10px 24px  0',
    height: '80%',
    overflow: 'auto',
  },

  ul: {
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

  button: {
    width: '40px',
    height: '50px',
    color: '#DCC9EB',
    cursor: 'pointer',

    ':active': {
      color: '#dedede',
    },
  },
});
