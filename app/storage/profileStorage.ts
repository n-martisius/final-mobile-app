import AsyncStorage from '@react-native-async-storage/async-storage';

const NAME_KEY = 'NAME';
const CITY_KEY = 'CITY';

export const saveProfile = async (name: string, city: string) => {
  await AsyncStorage.setItem(NAME_KEY, name);
  await AsyncStorage.setItem(CITY_KEY, city);
};

export const loadProfile = async () => {
  const name = await AsyncStorage.getItem(NAME_KEY);
  const city = await AsyncStorage.getItem(CITY_KEY);
  return { name, city };
};

export const clearProfile = async () => {
  await AsyncStorage.removeItem(NAME_KEY);
  await AsyncStorage.removeItem(CITY_KEY);
};