import { supabase } from '../../core/utils/supabase';

export const createProfile = async (profileData: any) => {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) throw new Error('User not logged in');

  const { data, error } = await supabase
    .from('profiles')
    .insert([{ id: user.id, ...profileData }]);
  if (error) throw error;
  return data;
};

export const getProfile = async () => {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  if (error) throw error;
  return data;
};
