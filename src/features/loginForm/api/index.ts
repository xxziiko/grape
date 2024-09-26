import { supabase } from '@/shared';
import { handleError } from '../../../shared/utils';

export const checkEmailExists = async (
  email: string | undefined,
): Promise<boolean | null> => {
  const selectEamil = await supabase
    .from('users')
    .select('*')
    .eq('email', email)
    .then(handleError);

  return !!selectEamil?.length;
};
