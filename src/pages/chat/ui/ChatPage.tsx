import { ChatList, FriendList } from '@/features/chat';
import { Settings } from '@/features/settings';
import { PageLayout, SearchBar } from '@/shared';
import { Header } from '@/widgets';
import { NavigationBar } from '@/widgets/navigation';
import { memo, useState } from 'react';

const ChatPage = () => {
  const [selectedNavItem, setSelectedNavItem] = useState<string>('채팅');

  return (
    <PageLayout>
      <Header isPlusIconVisible />
      <NavigationBar
        onClick={setSelectedNavItem}
        selectedNavItem={selectedNavItem}
      />

      {selectedNavItem !== '설정' && <SearchBar />}

      {selectedNavItem === '채팅' && <ChatList />}

      {selectedNavItem === '친구 목록' && <FriendList />}

      {selectedNavItem === '설정' && <Settings />}
    </PageLayout>
  );
};

export default memo(ChatPage);
