import { supabase } from '@/shared';

const signOutUser = async () => {
  return await supabase.auth.signOut();
};

export default signOutUser;
