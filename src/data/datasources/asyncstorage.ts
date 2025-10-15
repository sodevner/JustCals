import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeGuestUserId = async (id: string) => {
  await AsyncStorage.setItem('guest_user_id', id);
};

export const getGuestUserId = async () => {
  return await AsyncStorage.getItem('guest_user_id');
};
