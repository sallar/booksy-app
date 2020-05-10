import AsyncStorage from '@react-native-community/async-storage';

export const store = async (key: string, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(`@booksy/${key}`, value);
  } catch (e) {
    console.error(e);
  }
};

export const retrieve = async (key: string): Promise<string | null> => {
  try {
    return AsyncStorage.getItem(`@booksy/${key}`);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const remove = async (key: string) => {
  try {
    1;
    await AsyncStorage.removeItem(`@booksy/${key}`);
  } catch (e) {
    console.error(e);
  }
};
