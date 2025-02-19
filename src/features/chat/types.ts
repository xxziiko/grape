import { RemapKeys } from '@/shared';

export type RawChat = {
  chat_id: string;
  friend_id: string;
  friend_name: string;
  is_new: boolean;
  latest_message_body: string;
  latest_message_created_time: string;
};

type MapRawChatToChatItem<T extends RawChat> = {
  chatId: T['chat_id'];
  friendId: T['friend_id'];
  friendName: T['friend_name'];
  isNew: T['is_new'];
  latestMessage: {
    body: T['latest_message_body'];
    created_at: T['latest_message_created_time'];
  };
};

export type ChatItem = MapRawChatToChatItem<RawChat>;

export type Message = {
  chat_id: string;
  user_id: string;
  body: string;
  id?: number | string;
  created_at?: string;
};

export type RawFriend = {
  friend_id: string;
  friend_name: string;
};

export type Friend = RemapKeys<
  RawFriend,
  { friend_id: 'id'; friend_name: 'friendName' }
>;
