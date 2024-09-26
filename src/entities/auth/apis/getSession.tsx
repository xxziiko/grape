import { handleError } from '@/shared';
import { supabase } from '@/shared';

const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  return handleError({ data: data.session, error });
};

export default getSession;
