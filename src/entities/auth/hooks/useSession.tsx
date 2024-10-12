import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { refreshToken, sessionAtom } from '@/entities/auth';

const useSession = () => {
  const [session, setSession] = useAtom(sessionAtom);

  const checkAndRefreshSession = async () => {
    if (session) {
      const now = Math.floor(Date.now() / 1000);
      if (session.expires_at && now >= session.expires_at) {
        const newSession = await refreshToken();
        setSession(newSession);
      }
    }
  };

  useEffect(() => {
    checkAndRefreshSession();
    // console.log('refresh token!');
  }, [session]);

  return { session, setSession };
};

export default useSession;
