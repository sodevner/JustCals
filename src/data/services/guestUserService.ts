import uuid from 'react-native-uuid';
import { getGuestUserId, storeGuestUserId } from '../../data/datasources/asyncstorage';
import { supabase } from '../../core/utils/supabase';

export const ensureGuestUser = async () => {
  let guestId = await getGuestUserId();

  if (guestId) return guestId;

    const randomId = uuid.v4().toString();
const email = `guest-${randomId}@guest.app`;
  const password = randomId;


  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  // Prüfen ob user existiert
  const userId = data.user?.id;
  if (!userId) throw new Error('Anonymous user creation failed');

  guestId = userId;
  await storeGuestUserId(guestId);

  // Optional: direkt Profil anlegen
  await supabase.from('profiles').insert([{ id: guestId }]);

  return guestId;
};
