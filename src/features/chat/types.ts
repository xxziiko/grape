export type ChatItem = {
  friendId: string;
  friendName: string;
  latestMessage: {
    body: string;
    created_at: string;
  };
  isNew: boolean;
  chatId: string;
};

export type Messages = {
  chat_id: string | undefined;
  user_id: string;
  id?: number;
  body: string;
  created_at?: string;
};

export type Friend = {
  id: string;
  friendName: string;
};
